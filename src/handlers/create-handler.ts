import { AxiosRequestConfig } from 'axios';
import { LinearCreateBase } from '../sanitize/base';
import { ProjectData } from '../sanitize/project';

export const handleCreateEvent = async (
  config: AxiosRequestConfig,
  body: LinearCreateBase & { data: ProjectData },
): Promise<boolean> => {
  return true;
};
