import * as z from 'zod';
import { SafeParseReturnType, ZodError } from 'zod';
import isISODate from '../utils/iso-string';
import { CommentData, parseCommentData } from './comment';
import { IssueData, parseIssueData } from './issue';
import { ProjectData, parseProjectData } from './project';

export interface LinearBody {
  action: ActionType;
  createdAt: Date;
  organizationId: string;
  url: string;
  type: UpdateType;
  data: LinearData;
  updatedFrom?: UpdatedFrom;
}

export type LinearData = ProjectData | IssueData | CommentData;

export interface UpdatedFrom {
  updatedAt?: Date | null;
  name?: string | null;
  state?: string | null;
  assigneeId?: string | null;
  description?: string | null;
  sortOrder?: number | null;
  startedAt?: Date | null;
  startDate?: Date | null;
  cycleId?: Date | null;
  stateId?: string | null;
  leadId?: string | null;
  memberIds?: Array<string | null>;
  body?: string | null;
  editedAt?: Date | null;
}

export enum UpdateType {
  Issue = `Issue`,
  Project = `Project`,
  Comment = `Comment`,
}

export enum ActionType {
  Create = `create`,
  Update = `update`,
  Remove = `remove`,
}

export const parseBasePayload = (body: any): SafeParseReturnType<{}, Partial<LinearBody>> =>
  z
    .object({
      url: z.string(),
      action: z.enum([`create`, `update`, `remove`]).transform(s => s as ActionType),
      type: z.enum([`Project`, `Issue`, `Comment`]).transform(s => s as UpdateType),
      createdAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      organizationId: z.string(),
      updatedFrom: z.object({
        updatedAt: z
          .string()
          .refine(isISODate, { message: `Invalid ISO datestring` })
          .transform(s => (s ? new Date(s) : null))
          .nullable(),
        name: z.string().nullable().optional(),
        state: z.string().optional(),
        body: z.string().nullable().optional(),
        leadId: z.string().nullable().optional(),
        stateId: z.string().nullable().optional(),
        sortOrder: z.number().optional(),
        assigneeId: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        memberIds: z.array(z.string().nullable()).optional(),
        cycleId: z
          .string()
          .refine(isISODate, { message: `Invalid ISO datestring` })
          .transform(s => new Date(s))
          .nullable()
          .optional(),
        editedAt: z
          .string()
          .refine(isISODate, { message: `Invalid ISO datestring` })
          .transform(s => new Date(s))
          .nullable()
          .optional(),
        startAt: z.string().nullable().optional(),
        startedDate: z
          .string()
          .refine(isISODate, { message: `Invalid ISO datestring` })
          .transform(s => new Date(s))
          .nullable()
          .optional(),
      }),
    })
    .safeParse(body);

export const parseData = (type: string, data: any): SafeParseReturnType<{}, LinearData> => {
  switch (type) {
    case `Project`:
      return parseProjectData(data);
    case `Issue`:
      return parseIssueData(data);
    case `Comment`:
      return parseCommentData(data);
    default:
      return {
        error: new ZodError([{ path: [0], code: 'custom', message: `Invalid 'type' value in request body` }]),
        success: false,
      };
  }
};
