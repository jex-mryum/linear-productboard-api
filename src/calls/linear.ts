import { LinearClient, LinearError } from '@linear/sdk';
import env from '../utils/environment';
import { logger } from '../utils/log';

const linearClient = new LinearClient({ apiKey: env.linearApiKey });

export const getProjectById = async (id: string): Promise<{ progress: number; featureId: string }> => {
  try {
    const project = await linearClient.project(id);
    return { progress: project.progress, featureId: project.description };
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export const getProjectByIssueId = async (id: string): Promise<{ progress: number; featureId: string }> => {
  try {
    const issue = await linearClient.issue(id);
    const project = await issue.project;
    return project ? { progress: project.progress, featureId: project.description } : { progress: -1, featureId: `` };
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
