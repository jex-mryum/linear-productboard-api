import { LinearClient } from '@linear/sdk';
import env from '../utils/environment';

const linearClient = new LinearClient({ apiKey: env.linearApiKey });

export const getProjectById = async (id: string): Promise<number> => {
  const project = await linearClient.project(id);
  return project.progress;
};
