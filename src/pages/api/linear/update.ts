import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { env } from '../../../utils/environment';
import { productboardApiTest } from '../../../utils/graphql';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { body, method } = req;
  const { action, data } = body;
  console.log(body);

  // const featureId = data.description;
  // const parsed = z
  //   .object({
  //     action: z.enum([`update`]),
  //     data: z.object({
  //       id: z.string(),
  //       title: z.string(),
  //       description: z.string(),
  //     }),
  //     method: z.string().nonempty(),
  //   })
  //   .safeParse({
  //     action,
  //     data,
  //     method,
  //   });

  // if (parsed.success && parsed.data.method != `POST`) {
  //   res.status(403).send({ message: `Invalid request method` });
  //   return;
  // }

  // if (!parsed.success) {
  //   console.log(`\n\n${parsed.error}`);
  //   res.status(400).send({
  //     message: `Invalid request shape or action - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
  //   });
  //   return;
  // }
  // console.log({ body, featureId } + `\n\n\n`);
  // console.log(await productboardApiTest(featureId));

  res.status(200).send({});
};
