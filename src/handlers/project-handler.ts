import axios, { AxiosRequestConfig } from 'axios';
import { LinearBase, UpdatedFrom } from '../sanitize/base';
import { ProjectData, ProjectUpdate } from '../sanitize/project';
import { env } from '../utils/environment';

export const handleProjectEvent = async (body: LinearBase & { data: ProjectData }): Promise<boolean> => {
  const { action, updatedFrom, data } = body;
  switch (action) {
    case `update`:
      return updatedFrom ? await updateProject(updatedFrom, data as ProjectUpdate) : false; // be specific
    default:
      return false;
  }
};

const updateProject = async (updatedFrom: UpdatedFrom, data: ProjectUpdate): Promise<boolean> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${env.productboardApiToken}`,
      'Content-Type': 'application/json',
      'X-Version': 1,
    },
  };
  const updateKeys: Array<string> = Object.keys(updatedFrom);
  // const dataKeys: Array<string> = Object.keys(data);
  if (!updateKeys.includes(`state`)) {
    return false;
  }
  const res = await axios.put(
    `${env.productboardApiBaseUrl}/features/${data.description}`,
    {
      data: {
        description: `<p>State: ${data.state}</p>`,
      },
    },
    config,
  );
  return res.status === 200;
};
