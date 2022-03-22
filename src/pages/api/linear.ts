import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { handleProjectEvent } from '../../handlers/project-handler';
import { ActionType, parseBasePayload, UpdateType } from '../../sanitize/base';
import { parseProjectUpdate, ProjectData } from '../../sanitize/project';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { body, method } = req;
  if (method != `POST`) {
    res.status(403).send({ message: `Invalid request method` });
    return;
  }

  const parsed = parseBasePayload(body);
  if (!parsed.success) {
    return res.status(400).send({
      message: `Invalid request shape or action - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
    });
  }

  const { type, action } = parsed.data;
  const { data } = body;

  if (type !== UpdateType.Project) {
    // TEMP EXIT - PROJECT ONLY
    return res.status(202).send({});
  }

  // const sanitized = parseData(type, data); // switch surfaced here?? hand switch values deeper?
  const sanitized = parseProjectData(action, data);

  if (!sanitized.success) {
    return res.status(400).send({ message: `Request body 'data' structure was invalid: ${sanitized.error}` });
  }

  console.log(`Body\n`, body);
  console.log(`Parsed\n`, parsed);
  console.log(`Sanitized Data`, sanitized.data);

  let success: boolean;
  switch (type) {
    case `Project`:
      success = await handleProjectEvent({ ...parsed.data, data: sanitized.data });
      break;
    default:
      return;
  }

  // Query Linear API to get projectId if not available (Comment type only - defer)
  // Query Linear API to get PB API id from Project Description
  // PUT to PB API to update description with original update

  res.status(200).send({});
};

const parseProjectData = (action: ActionType, data: any): z.SafeParseReturnType<{}, ProjectData> => {
  switch (action) {
    case `update`:
      return parseProjectUpdate(data);
    default:
      return {
        error: new z.ZodError([{ path: [0], code: 'custom', message: `Invalid 'type' value in request body` }]),
        success: false,
      };
  }
};
