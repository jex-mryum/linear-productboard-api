import { IssueData } from './issue-interface';
import { ProjectData } from './project-interface';

export interface LinearBody {
  action: ActionType;
  createdAt: Date;
  organizationId: string;
  url: string;
  type: UpdateType;
  data: ProjectData | IssueData | CommentData;
  updatedFrom?: {
    updatedAt: Date;
    name?: string;
    state?: {
      id: string;
      name: string;
      color: string;
      type: string;
    };
    assigneeId?: string;
    description?: string;
    sortOrder?: number;
    startedAt?: Date;
    startedDate?: Date;
    cycleId?: Date;
    stateId?: string;
    leadId?: string;
    memberIds?: Array<string>;
    body?: string;
    editedAt?: Date;
  };
}

enum UpdateType {
  Issue = `Issue`,
  Project = `Project`,
  Comment = `Comment`,
}

enum ActionType {
  Create = `create`,
  Update = `update`,
  Remove = `remove`,
}

enum State {}

export interface CommentData {
  // ACTIONS - Create (with or without attachment, in body), Update, Delete
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  issueId: string;
  userId: string;
  issue: { id: string; title: string };
  user: { id: string; name: string };
}
