import * as z from 'zod';
import { SafeParseReturnType } from 'zod';
import isISODate from '../utils/iso-string';
import { CommentData } from './comment';
import { IssueData } from './issue';
import { ProjectData } from './project';

export interface LinearBase {
  action: ActionType;
  createdAt: Date;
  organizationId: string;
  url?: string;
  type: UpdateType;
  updatedFrom?: UpdatedFrom | undefined;
}

export type LinearData = ProjectData | IssueData | CommentData;

export interface UpdatedFrom {
  title?: string | null;
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

export const parseBasePayload = (body: any): SafeParseReturnType<{}, LinearBase> =>
  z
    .object({
      url: z.string().optional(),
      action: z.enum([`create`, `update`, `remove`]).transform(s => s as ActionType),
      type: z.enum([`Project`, `Issue`, `Comment`]).transform(s => s as UpdateType),
      createdAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      organizationId: z.string(),
      updatedFrom: z
        .object({
          title: z.string().nullable().optional(),
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
        })
        .optional(),
    })
    .safeParse(body);
