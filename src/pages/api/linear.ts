import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getProjectById } from '../../calls/linear';
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
      parsedBase = constructSafeParseError(
        `Failed to parse request base - fell through switch-case (src/pages/api/linear)`,
      );
  }

  if (!parsedBase.success) {
    logger.error(`Request base parse rejection: ${JSON.stringify(parsedBase)}`);
    return res.status(400).send({
      message: `Invalid request shape or action - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
    });
  }

  const { type, action } = parsedBase.data;
  const { data } = body;
  let projectId: string;
  let progress: number;
  switch (type) {
    case ElementType.Project:
      projectId = data.id;
      progress = await getProjectById(projectId);
      break;
    case ElementType.Issue:
      projectId = data.projectId;
      progress = await getProjectById(projectId);
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
  const handled = await updatePBFeatureById(productboardFeatureId, progress);
  handled ? res.status(200).send({}) : res.status(500).send({ message: `Unhandled error occured` });
};
