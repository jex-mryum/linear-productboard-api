import * as z from 'zod';
import isISODate from '../utils/iso-string';
import { constructSafeParseError } from '../utils/zod';
import { ActionType } from './base';

export interface IssueCreate {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
  title: string;
  priority: number;
  boardOrder: number;
  sortOrder: number;
  teamId: string;
  projectId: string;
  previousIdentifiers: Array<string>;
  creatorId: string;
  stateId: string;
  priorityLabel: string;
  subscriberIds: Array<string>;
  labelIds: Array<string>;
  project: { id: string; name: string };
  state: { id: string; name: string; color: string; type: string };
  team: { id: string; name: string; key: string };
}

export interface IssueUpdate extends IssueCreate {
  description?: string;
  startedAt?: Date;
  cycleId?: string;
  assigneeId?: string;
  assignee?: { id: string; name: string };
  cycle?: {
    id: string;
    number: number;
    name: string;
    startsAt: Date;
    endsAt: Date;
  };
}

export interface IssueRemove extends IssueUpdate {
  archivedAt: Date;
  trashed: boolean;
}

export type IssueData = IssueCreate | IssueUpdate | IssueRemove;

export const parseIssueData = (action: string, data: {}): z.SafeParseReturnType<{}, IssueData> => {
  switch (action) {
    case ActionType.Create:
      return parseIssueCreate(data);
    case ActionType.Update:
      return parseIssueUpdate(data);
    case ActionType.Remove:
      return parseIssueRemove(data);
    default:
      return constructSafeParseError(`Failed to parse Issue data payload`);
  }
};

export const parseIssueCreate = (payload: any): z.SafeParseReturnType<{}, IssueCreate> =>
  z
    .object({
      id: z.string(),
      createdAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      updatedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      number: z.number(),
      title: z.string(),
      priority: z.number(),
      boardOrder: z.number(),
      sortOrder: z.number(),
      teamId: z.string(),
      projectId: z.string(),
      previousIdentifiers: z.array(z.string()),
      creatorId: z.string(),
      stateId: z.string(),
      priorityLabel: z.string(),
      subscriberIds: z.array(z.string()),
      labelIds: z.array(z.string()),
      project: z.object({
        id: z.string(),
        name: z.string(),
      }),
      state: z.object({ id: z.string(), name: z.string(), color: z.string(), type: z.string() }),
      team: z.object({ id: z.string(), name: z.string(), key: z.string() }),
    })
    .safeParse(payload);

export const parseIssueUpdate = (payload: any): z.SafeParseReturnType<{}, IssueUpdate> =>
  z
    .object({
      id: z.string(),
      createdAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      updatedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      number: z.number(),
      title: z.string(),
      priority: z.number(),
      boardOrder: z.number(),
      sortOrder: z.number(),
      teamId: z.string(),
      projectId: z.string(),
      previousIdentifiers: z.array(z.string()),
      creatorId: z.string(),
      stateId: z.string(),
      priorityLabel: z.string(),
      subscriberIds: z.array(z.string()),
      labelIds: z.array(z.string()),
      project: z.object({
        id: z.string(),
        name: z.string(),
      }),
      state: z.object({ id: z.string(), name: z.string(), color: z.string(), type: z.string() }),
      team: z.object({ id: z.string(), name: z.string(), key: z.string() }),
      description: z.string().optional(),
      startedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s))
        .optional(),
      cycleId: z.string().optional(),
      assigneeId: z.string().optional(),
      assignee: z.object({ id: z.string(), name: z.string() }).optional(),
      cycle: z
        .object({
          id: z.string(),
          number: z.number(),
          name: z.string(),
          startsAt: z
            .string()
            .refine(isISODate, { message: `Invalid ISO datestring` })
            .transform(s => new Date(s)),
          endsAt: z
            .string()
            .refine(isISODate, { message: `Invalid ISO datestring` })
            .transform(s => new Date(s)),
        })
        .optional(),
    })
    .safeParse(payload);

export const parseIssueRemove = (payload: any): z.SafeParseReturnType<{}, IssueRemove> =>
  z
    .object({
      id: z.string(),
      createdAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      updatedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      number: z.number(),
      title: z.string(),
      priority: z.number(),
      boardOrder: z.number(),
      sortOrder: z.number(),
      teamId: z.string(),
      projectId: z.string(),
      previousIdentifiers: z.array(z.string()),
      creatorId: z.string(),
      stateId: z.string(),
      priorityLabel: z.string(),
      subscriberIds: z.array(z.string()),
      labelIds: z.array(z.string()),
      project: z.object({
        id: z.string(),
        name: z.string(),
      }),
      state: z.object({ id: z.string(), name: z.string(), color: z.string(), type: z.string() }),
      team: z.object({ id: z.string(), name: z.string(), key: z.string() }),
      description: z.string().optional(),
      startedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s))
        .optional(),
      cycleId: z.string().optional(),
      assigneeId: z.string().optional(),
      assignee: z.object({ id: z.string(), name: z.string() }).optional(),
      cycle: z
        .object({
          id: z.string(),
          number: z.number(),
          name: z.string(),
          startsAt: z
            .string()
            .refine(isISODate, { message: `Invalid ISO datestring` })
            .transform(s => new Date(s)),
          endsAt: z
            .string()
            .refine(isISODate, { message: `Invalid ISO datestring` })
            .transform(s => new Date(s)),
        })
        .optional(),
      archivedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
      trashed: z.boolean(),
    })
    .safeParse(payload);
