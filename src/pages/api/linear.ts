import type { NextApiRequest, NextApiResponse } from 'next';
import { CommentData, LinearBody } from '../../interfaces/interfaces';
import * as z from 'zod';
import isISODate from '../../utils/iso-string';
import { projectEventHandler } from '../../handlers/project-handler';
import { ProjectData } from '../../interfaces/project-interface';
import { issueEventHandler } from '../../handlers/issue-handler';
import { IssueData } from '../../interfaces/issue-interface';
import { commentEventHandler } from '../../handlers/comment-handler';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method } = req;
  const body: LinearBody = req.body;
  const { action, data, type, url, createdAt, updatedFrom } = body;

  const parsed = z
    .object({
      url: z.string().nonempty(),
      action: z.enum([`create`, `update`, `remove`]),
      type: z.enum([`Project`, `Issue`, `Comment`]),
      createdAt: z.string().refine(isISODate, { message: `Invalid ISO datestring` }),
      updatedFrom: z.object({
        updatedAt: z.string().refine(isISODate, { message: `Invalid ISO datestring` }),
        name: z.string().optional(),
        state: z
          .object({
            id: z.string(),
            name: z.string(),
            type: z.string(),
            color: z.string(),
          })
          .optional(),
        body: z.string().optional(),
        leadId: z.string().optional(),
        stateId: z.string().optional(),
        sortOrder: z.number().optional(),
        assigneeId: z.string().optional(),
        description: z.string().optional(),
        memberIds: z.array(z.string()).optional(),
        cycleId: z.string().refine(isISODate, { message: `Invalid ISO datestring` }).optional(),
        editedAt: z.string().refine(isISODate, { message: `Invalid ISO datestring` }).optional(),
        startedAt: z.string().refine(isISODate, { message: `Invalid ISO datestring` }).optional(),
        startedDate: z.string().refine(isISODate, { message: `Invalid ISO datestring` }).optional(),
      }),
    })
    .safeParse({
      action,
      createdAt,
      url,
      type,
      updatedFrom,
    });

  if (!parsed.success) {
    res.status(400).send({
      message: `Invalid request shape or action - please compare the Linear Webhook documentation to the OpenAPI doc for this project`,
    });
    return;
  }

  if (method != `POST`) {
    res.status(403).send({ message: `Invalid request method` });
    return;
  }
  switch (body.type) {
    case `Project`:
      projectEventHandler(data as ProjectData);
      break;
    case `Issue`:
      issueEventHandler(data as IssueData);
      break;
    case `Comment`:
      commentEventHandler(data as CommentData);
      break;
    default:
      res.status(202).send({ message: `Unused type - event was not processed` });
      return;
  }

  res.status(200).send({});
};
