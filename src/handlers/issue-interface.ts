// ACTIONS - Create Issue, Update Description, Update Assignee, Update Status, Delete Issue

export interface IssueData {
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
