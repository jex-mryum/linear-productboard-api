import axios, { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { LinearUpdateBase, UpdatedFrom } from '../sanitize/base';
import { ProjectData, ProjectUpdate } from '../sanitize/project';
import { env } from '../utils/environment';
import { logger } from '../utils/log';
import isUUIDv4 from '../utils/uuid';

export const handleUpdateEvent = async (
  config: AxiosRequestConfig,
  body: LinearUpdateBase & { data: ProjectData }, // data type has to change
): Promise<boolean> => {
  const { type, updatedFrom, data } = body;
  const { description } = data;
  if (!isUUIDv4(description)) {
    logger.error(`Project description did not contain a valid Productboard API Id`);
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
  update: ProjectUpdate,
  config: AxiosRequestConfig,
): Promise<boolean> => {
  const feature: AxiosResponse = await axios.get(`${env.productboardApiBaseUrl}/features/${id}`, config);
  const stateObj: string = feature.data.data.description; // this is fucking gross, extract this
  const state = stateObj.split(new RegExp(/<p>|<\/p>|<br \/>/)).join(`\n`);

  const fromProps: Array<string> = Object.keys(updatedFrom);
  const toProps: Array<string> = Object.keys(update);
  const matchProps = toProps.filter(p => fromProps.includes(p) && p !== `updatedAt`);

  const formattedUpdate = matchProps
    .reduce(
      (agg, prop) => agg.concat(`\n`, `${prop}: ${update[prop as keyof ProjectUpdate]}`),
      String(update.updatedAt),
    )
    .concat(`\n`, state);

  const res = await axios.put(
    `${env.productboardApiBaseUrl}/features/${id}`,
    {
      data: {
        description: `<p>${formattedUpdate}</p>`,
      },
    },
    config,
  );
  return res.status === 200;
};
