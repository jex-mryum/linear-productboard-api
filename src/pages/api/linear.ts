import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getIssueById, getProjectById } from '../../calls/linear';
import { updatePBFeatureById } from '../../calls/productboard';
import {
  ActionType,
  ElementType,
  LinearCreateBase,
  LinearRemoveBase,
  LinearUpdateBase,
  parseCreateBase,
  parseRemoveBase,
  parseUpdateBase,
} from '../../sanitize/base';
import { parseProjectData, ProjectData } from '../../sanitize/project';
import { IssueData, parseIssueData } from '../../sanitize/issue';
import { CommentData, parseCommentData } from '../../sanitize/comment';
import { logger } from '../../utils/log';
import isUUIDv4 from '../../utils/uuid';
import { constructSafeParseError } from '../../utils/zod';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { body, method } = req;
  if (method != `POST`) {
    res.status(403).send({ message: `Invalid request method` });
    return;
  }

  if (!Object.values(ActionType).includes(body.action)) {
    res.status(400).send({ message: `Action type not valid` });
    return;
  }

  let parsedBase: z.SafeParseReturnType<{}, LinearCreateBase | LinearUpdateBase | LinearRemoveBase>;
  switch (body.action) {
    case ActionType.Create:
      parsedBase = parseCreateBase(body);
      break;
    case ActionType.Update:
      parsedBase = parseUpdateBase(body);
      break;
    case ActionType.Remove:
      parsedBase = parseRemoveBase(body);
      break;
    default:
      parsedBase = constructSafeParseError(`Failed to parse request base - fell through switch-case`);
  }

  if (!parsedBase.success) {
    logger.error(`Request base parse rejection: ${JSON.stringify(parsedBase)}`);
    return res.status(400).send({
      message: `Invalid request shape - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
    });
  }

  const { data } = body;
  const { type, action } = parsedBase.data;

  // if comment, get issue by commentId
  // then get project by Id
  // then update progress
  let parsedData:
    | z.SafeParseReturnType<{}, ProjectData>
    | z.SafeParseReturnType<{}, IssueData>
    | z.SafeParseReturnType<{}, CommentData>;
  switch (type) {
    case ElementType.Project:
      parsedData = parseProjectData(action, data);
      break;
    case ElementType.Issue:
      parsedData = parseIssueData(action, data);
      break;
    case ElementType.Comment:
      parsedData = parseCommentData(data);
      break;
  }

  if (!parsedData.success) {
    logger.error(`Request ${type} data parse rejection: ${JSON.stringify(parsedData)}`);
    return res.status(400).send({
      message: `Invalid request shape - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
    });
  }

  let projectId: string;
  let progress: number;
  switch (type) {
    case ElementType.Project:
      const projectData = parsedData.data as ProjectData;
      progress = await getProjectById(projectData.id);
      break;
    case ElementType.Issue:
      const issueData = parsedData.data as IssueData;
      progress = await getProjectById(issueData.projectId);
    case ElementType.Comment:
      getIssueById(parsedData.data.id);
      return res.status(200).send({});
    default:
      logger.error(`Failed to source projectId from webhook`);
      progress = -1;
  }

  const { description } = data;
  if (!isUUIDv4(description)) {
    logger.error(`Project description did not contain a valid Productboard API Id`);
    return res.status(400).send({});
  }
  const productboardFeatureId = description;
  const handled = progress === -1 ? await updatePBFeatureById(productboardFeatureId, progress) : false;
  handled ? res.status(200).send({}) : res.status(500).send({ message: `Unhandled error occured` });
};
