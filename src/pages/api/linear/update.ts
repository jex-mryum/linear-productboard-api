import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { body, method } = req;

  if (method != `POST`) {
    res.status(400).send({ message: `Invalid request method` });
    return;
  }

  const { action, data } = body;

  console.log({ state: data.state, team: data.team });

  const parsed = z
    .object({
      action: z.enum([`update`]),
      data: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    })
    .safeParse({
      action,
      data,
    });

  if (!parsed.success) {
    console.log(`\n\n${parsed.error}`);
    // res.status(400).send({
    //   message: `Invalid request shape or action - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
    // });
    return;
  }

  res.status(200).send({});
};

// {
//   body: {
//     action: 'update',
//     createdAt: '2022-03-15T22:52:34.199Z',
//     data: {
//       id: 'ce90f424-f56f-4f38-8625-a238e63a147e',
//       createdAt: '2022-03-15T22:49:39.689Z',
//       updatedAt: '2022-03-15T22:52:34.199Z',
//       number: 21,
//       title: 'TEST #2',
//       description: 'Create ticket\n\nUpdate ticket\n\nUpdate ticket 2\n\nUpdate ticket 3',
//       priority: 0,
//       boardOrder: 0,
//       sortOrder: -7312.39,
//       teamId: '3449d19c-3330-4242-be02-babac08b33c7',
//       previousIdentifiers: [],
//       creatorId: '39c9bedd-16e7-4134-91a7-ca0c504d3725',
//       stateId: '39b492b8-4894-45d5-ad94-2b7821c01a07',
//       priorityLabel: 'No priority',
//       subscriberIds: [Array],
//       labelIds: [],
//       state: [Object],
//       team: [Object]
//     },
//     updatedFrom: {
//       updatedAt: '2022-03-15T22:50:30.241Z',
//       description: 'Create ticket\n\nUpdate ticket\n\nUpdate ticket 2'
//     },
//     url: 'https://linear.app/mr-yum/issue/IDEV-21/test-2',
//     type: 'Issue',
//     organizationId: 'f72abaec-b3e0-4d06-b429-fa94e20ff4c1'
//   },
//   method: 'POST'
// }
