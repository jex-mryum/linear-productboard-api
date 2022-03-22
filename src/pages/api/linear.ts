import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { handleProjectEvent } from '../../handlers/project-handler';
import { ActionType, parseBasePayload, UpdateType } from '../../sanitize/base';
import { parseProjectUpdate, ProjectData } from '../../sanitize/project';
import { logger } from '../../utils/log';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { body, method } = req;
  if (method != `POST`) {
    res.status(403).send({ message: `Invalid request method` });
    return;
  }

  const parsed = parseBasePayload(body);
  if (!parsed.success) {
    logger.error(`Request base parse rejection: ${JSON.stringify(parsed)}`);
    return res.status(400).send({
      message: `Invalid request shape or action - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
    });
  }
  logger.info(`Parsed: ${JSON.stringify(parsed)}`);

  const { type, action } = parsed.data;
  const { data } = body;

  if (type !== UpdateType.Project) {
    return res.status(202).send({});
  }

  const sanitized = parseProjectData(action, data);

  if (!sanitized.success) {
    logger.error(`Request data parse rejection: ${JSON.stringify(sanitized)}`);
    return res.status(400).send({ message: `Request body 'data' structure was invalid: ${sanitized.error}` });
  }
  logger.info(`Data: ${JSON.stringify(sanitized)}`);

  let success: boolean;
  switch (type) {
    case `Project`:
      success = await handleProjectEvent({ ...parsed.data, data: sanitized.data });
      break;
    default:
      return;
  }

  res.status(200).send({});
};

const parseProjectData = (action: ActionType, data: any): z.SafeParseReturnType<{}, ProjectData> => {
  switch (action) {
    case `update`:
      return parseProjectUpdate(data);
    default:
      return {
        error: new z.ZodError([
          {
            path: [],
            code: 'custom',
            message: `Unable to parse req.body.data as the req.action fell through parseProjectData switch-case`,
          },
        ]),
        success: false,
      };
  }
};
