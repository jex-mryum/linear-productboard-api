// ACTIONS - Update Description, Update Lead (Owner), Update Name, Update Status (enum?)

export interface ProjectData {
  // Name / Description updates have no additional props
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
  startDate?: Date; // Lead / Status updates only
  startedAt?: Date; // Lead / Status updates only
}
