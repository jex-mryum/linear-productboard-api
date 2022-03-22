import type { NextApiRequest, NextApiResponse } from 'next';
import { parseBasePayload, parseData } from '../../sanitize/base';

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

  const { type, data } = body;
  const sanitized = parseData(type, data);
  if (!sanitized.success) {
    return res.status(400).send({ message: `Request body 'data' structure was invalid: ${sanitized.error}` });
  }

  console.log(`Body\n`, body);
  console.log(`Parsed\n`, parsed);
  console.log(`Sanitized Data`, sanitized.data);

  // Query Linear API to get projectId if not available (Comment type only - defer)
  // Query Linear API to get PB API id from Project Description
  // PUT to PB API to update description with original update

  res.status(200).send({});
};
