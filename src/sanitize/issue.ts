import * as z from 'zod';
import isISODate from '../utils/iso-string';

export interface IssueData {
  // ACTIONS - Create Issue, Update Description, Update Assignee, Update Status, Delete Issue
  // All
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

  // Assignee + Status Updates / Deletes
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

  // Deletes
  archivedAt?: Date;
  trashed?: boolean;
}

export const parseIssueData = (payload: any): z.SafeParseReturnType<{}, IssueData> =>
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

      // Assignee + Status Updates / Deletes
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

      // Deletes
      archivedAt: z
        .string()
        .refine(isISODate, { message: `Invalid ISO datestring` })
        .transform(s => new Date(s))
        .optional(),
      trashed: z.boolean().optional(),
    })
    .safeParse(payload);
