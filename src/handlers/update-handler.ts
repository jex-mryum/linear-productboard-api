import axios, { AxiosRequestConfig } from 'axios';
import { LinearUpdateBase, UpdatedFrom } from '../sanitize/base';
import { ProjectData, ProjectUpdate } from '../sanitize/project';
import { env } from '../utils/environment';
import { logger } from '../utils/log';
import isUUID from '../utils/uuid';

export const handleUpdateEvent = async (
  config: AxiosRequestConfig,
  body: LinearUpdateBase & { data: ProjectData },
): Promise<boolean> => {
  const { type, updatedFrom, data } = body;
  const { description } = data;
  if (!isUUID(description)) {
    return false;
  }
  const productboardFeatureId = description;

  switch (type) {
    case `Project`:
      return await updateProject(productboardFeatureId, updatedFrom, data as ProjectUpdate, config);
    case `Issue`:
    case `Comment`:
    default:
      return false;
  }
};

const updateProject = async (
  id: string,
  updatedFrom: UpdatedFrom,
  data: ProjectUpdate,
  config: AxiosRequestConfig,
): Promise<boolean> => {
  const state = await axios.get(`${env.productboardApiBaseUrl}/features/${id}`, config);
  logger.info(`State: `, state);
  const updateKeys: Array<string> = Object.keys(updatedFrom);
  // const dataKeys: Array<string> = Object.keys(data);
  if (!updateKeys.includes(`state`)) {
    return false;
  }
  const res = await axios.put(
    `${env.productboardApiBaseUrl}/features/${id}`,
    {
      data: {
        description: `<p>State: ${data.state}</p>`,
      },
    },
    config,
  );
  return res.status === 200;
};
