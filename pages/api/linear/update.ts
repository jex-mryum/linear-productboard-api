import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { body, method } = req;

  if (method != `POST`) {
    res.status(400).send({ message: `Invalid request method` });
    return;
  }

  // const parsed = z
  //   .object({
  //     action: z.enum([`update`]),
  //     data: z.object({}),
  //     type: z.string(),
  //     createdAt: z.string(),
  //   })
  //   .safeParse(body);

  // if (!parsed.success) {
  //   res.status(400).send({
  //     message: `Invalid request shape or action - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
  //   });
  //   return;
  // }

  res.status(200).send({ body, method });
};
