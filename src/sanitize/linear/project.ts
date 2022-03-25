import * as z from 'zod';
import isISODate from '../../utils/iso-string';
import { constructSafeParseError } from '../../utils/zod';
import { ActionType } from './base';

interface ProjectCreate {
  // ACTIONS - Update Description, Update Lead (Owner), Update Name, Update Status (enum?)
  // Name / Description updates have no additional props
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  slugId: string;
  color: string;
  state: string;
  creatorId: string;
  sortOrder: number;
  issueCountHistory: Array<number>;
  completedIssueCountHistory: Array<number>;
  scopeHistory: Array<number>;
  completedScopeHistory: Array<number>;
  slackNewIssue: boolean;
  slackIssueComments: boolean;
  slackIssueStatuses: boolean;
  teamIds: Array<string>;
  memberIds: Array<string>;
}

export interface ProjectUpdate extends ProjectCreate {
  leadId?: string; // Lead (owner) updates only
  startDate?: string; // Lead / Status updates only
  startedAt?: Date; // Lead / Status updates only
}

export interface ProjectDelete extends ProjectCreate {
  archivedAt: Date;
}

export type ProjectData = ProjectCreate | ProjectUpdate | ProjectDelete;

export const parseProjectData = (action: string, data: {}): z.SafeParseReturnType<{}, ProjectData> => {
  switch (action) {
    case ActionType.Create:
      return parseProjectCreate(data);
    case ActionType.Update:
      return parseProjectUpdate(data);
    case ActionType.Remove:
      return parseProjectRemove(data);
    default:
      return constructSafeParseError(`Failed to parse Project data payload`);
  }
};

export const parseProjectCreate = (payload: any): z.SafeParseReturnType<{}, ProjectCreate> =>
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
      name: z.string(),
      description: z.string(),
      slugId: z.string(),
      color: z.string(),
      state: z.string(),
      creatorId: z.string(),
      sortOrder: z.number(),
      issueCountHistory: z.array(z.number()),
      completedIssueCountHistory: z.array(z.number()),
      scopeHistory: z.array(z.number()),
      completedScopeHistory: z.array(z.number()),
      slackNewIssue: z.boolean(),
      slackIssueComments: z.boolean(),
      slackIssueStatuses: z.boolean(),
      teamIds: z.array(z.string()),
      memberIds: z.array(z.string()),
    })
    .safeParse(payload);

export const parseProjectUpdate = (payload: any): z.SafeParseReturnType<{}, ProjectUpdate> =>
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
      name: z.string(),
      description: z.string(),
      slugId: z.string(),
      color: z.string(),
      state: z.string(),
      creatorId: z.string(),
      sortOrder: z.number(),
      issueCountHistory: z.array(z.number()),
      completedIssueCountHistory: z.array(z.number()),
      scopeHistory: z.array(z.number()),
      completedScopeHistory: z.array(z.number()),
      slackNewIssue: z.boolean(),
      slackIssueComments: z.boolean(),
      slackIssueStatuses: z.boolean(),
      teamIds: z.array(z.string()),
      memberIds: z.array(z.string()),
      leadId: z.string().optional(),
      startDate: z.string().optional(),
      startedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s))
        .optional(),
    })
    .safeParse(payload);

export const parseProjectRemove = (payload: any): z.SafeParseReturnType<{}, ProjectDelete> =>
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
      name: z.string(),
      description: z.string(),
      slugId: z.string(),
      color: z.string(),
      state: z.string(),
      creatorId: z.string(),
      sortOrder: z.number(),
      issueCountHistory: z.array(z.number()),
      completedIssueCountHistory: z.array(z.number()),
      scopeHistory: z.array(z.number()),
      completedScopeHistory: z.array(z.number()),
      slackNewIssue: z.boolean(),
      slackIssueComments: z.boolean(),
      slackIssueStatuses: z.boolean(),
      teamIds: z.array(z.string()),
      memberIds: z.array(z.string()),
      archivedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s)),
    })
    .safeParse(payload);
