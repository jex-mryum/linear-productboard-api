import * as z from 'zod';

export interface CommentData {
  // ACTIONS - Create (with or without attachment, url in body), Update, Delete
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  issueId: string;
  userId: string;
  issue: { id: string; title: string };
  user: { id: string; name: string };
}

export const parseCommentData = (data: any): z.SafeParseReturnType<{}, CommentData> =>
  z
    .object({
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      body: z.string(),
      issueId: z.string(),
      userId: z.string(),
      issue: z.object({ id: z.string(), title: z.string() }),
      user: z.object({ id: z.string(), name: z.string() }),
    })
    .safeParse(data);
