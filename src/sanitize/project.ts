import * as z from 'zod';
import isISODate from '../utils/iso-string';
import { constructSafeParseError } from '../utils/zod';
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
  issueCountHistory: Array<string>;
  completedIssueCountHistory: Array<string>;
  scopeHistory: Array<string>;
  completedScopeHistory: Array<string>;
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
      issueCountHistory: z.array(z.string()),
      completedIssueCountHistory: z.array(z.string()),
      scopeHistory: z.array(z.string()),
      completedScopeHistory: z.array(z.string()),
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
      issueCountHistory: z.array(z.string()),
      completedIssueCountHistory: z.array(z.string()),
      scopeHistory: z.array(z.string()),
      completedScopeHistory: z.array(z.string()),
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

export const parseProjectDelete = (payload: any): z.SafeParseReturnType<{}, ProjectDelete> =>
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
      issueCountHistory: z.array(z.string()),
      completedIssueCountHistory: z.array(z.string()),
      scopeHistory: z.array(z.string()),
      completedScopeHistory: z.array(z.string()),
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

export const parseProjectData = (action: ActionType, data: any): z.SafeParseReturnType<{}, ProjectData> => {
  switch (action) {
    case `update`:
      return parseProjectUpdate(data);
    default:
      return constructSafeParseError(
        `Unable to parse req.body.data as the req.action fell through parseProjectData switch-case`,
      );
  }
};
