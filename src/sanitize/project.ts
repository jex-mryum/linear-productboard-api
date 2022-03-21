import * as z from 'zod';
import isISODate from '../utils/iso-string';

export interface ProjectData {
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
  leadId?: string; // Lead (owner) updates only
  startDate?: string; // Lead / Status updates only
  startedAt?: Date; // Lead / Status updates only
}

export const parseProjectData = (payload: any): z.SafeParseReturnType<{}, ProjectData> =>
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
