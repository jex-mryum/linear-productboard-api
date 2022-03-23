import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { handleUpdateEvent } from '../../handlers/update-handler';
import {
  ActionType,
  LinearCreateBase,
  LinearRemoveBase,
  LinearUpdateBase,
  parseCreateBase,
  parseRemoveBase,
  parseUpdateBase,
  UpdateType,
} from '../../sanitize/base';
import { parseProjectData, parseProjectUpdate, ProjectData } from '../../sanitize/project';
import productboardReqConfig from '../../utils/axios-config';
import { logger } from '../../utils/log';
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
  logger.info(`Parsed: ${JSON.stringify(parsedBase)}`);

  const { type, action } = parsedBase.data;
  const { data } = body;

  let parsedData;
  switch (type) {
    case UpdateType.Project:
      parsedData = parseProjectData(action, data);
      break;
    case UpdateType.Issue:
    case UpdateType.Comment:
    default:
      logger.info(JSON.stringify(body));
      return res.status(202).send({});
  }

  if (!parsedData.success) {
    logger.error(`Request data parse rejection: ${JSON.stringify(parsedData)}`);
    return res.status(400).send({ message: `Request body 'data' structure was invalid: ${parsedData.error}` });
  }
  logger.info(`Data: ${JSON.stringify(parsedData)}`);

  let handled: boolean;
  switch (action) {
    case `update`:
      handled = await handleUpdateEvent(productboardReqConfig, {
        ...parsedBase.data,
        data: parsedData.data,
      });
      break;
    case `create`:
    case `remove`:
    default:
      handled = false;
  }

  handled ? res.status(200).send({}) : res.status(500).send({ message: `Unhandled error occured` });
};
