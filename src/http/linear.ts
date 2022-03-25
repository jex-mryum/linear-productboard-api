import { LinearClient, LinearError } from '@linear/sdk';
import { ProgressUpdate } from '../domain/productboard';
import env from '../utils/environment';
import { logger } from '../utils/log';

const linearClient = new LinearClient({ apiKey: env.linearApiKey });

export const getProjectById = async (id: string): Promise<ProgressUpdate> => {
  try {
    const { description, progress } = await linearClient.project(id);
    return { progress: Number(progress.toFixed(2)), featureId: description };
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export const getProjectByIssueId = async (id: string): Promise<ProgressUpdate> => {
  try {
    const issue = await linearClient.issue(id);
    const project = await issue.project;
    return project
      ? { progress: Number(project.progress.toFixed(2)), featureId: project.description }
      : { progress: -1, featureId: `` };
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
