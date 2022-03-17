import { IssueData } from './issue-interface';
import { ProjectData } from './project-interface';

export interface LinearBase {
  action: ActionType;
  createdAt: Date;
  organizationId: string;
  url: string;
  updatedFrom: { updatedAt: Date; assigneeId: string };
}

export interface LinearBody extends LinearBase {
  type: UpdateType;
  data: ProjectData | IssueData | CommentData;
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

interface CommentData {
  body: string;
  issueId: string;
  userId: string;
  issue: { id: string; title: string };
  user: { id: string; name: string };
}
