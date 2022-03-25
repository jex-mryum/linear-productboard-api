import { LinearClient } from '@linear/sdk';
import env from '../utils/environment';

const linearClient = new LinearClient({ apiKey: env.linearApiKey });

export const getProjectById = async (id: string): Promise<{ progress: number; featureId: string }> => {
  const project = await linearClient.project(id);
  return { progress: project.progress, featureId: project.description };
};

export const getProjectByIssueId = async (id: string): Promise<{ progress: number; featureId: string }> => {
  const issue = await linearClient.issue(id);
  const project = await issue.project;
  return project ? { progress: project.progress, featureId: project.description } : { progress: -1, featureId: `` };
};
