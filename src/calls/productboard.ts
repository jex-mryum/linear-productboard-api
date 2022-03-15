import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../utils/environment';
import { logger } from '../utils/log';

export const updatePBFeatureById = async (project: { featureId: string; progress: number }) => {
  const { featureId, progress } = project;
  const res: AxiosResponse = await axios.put(
    `${env.productboardApiBaseUrl}/features/${featureId}`,
    {
      data: {
        description: `<p>Progress: ${progress * 100}%</p>`,
      },
    },
    productboardReqConfig,
  );
  logger.info(
    res.status === 200
      ? `Successfully updated Productboard feature ${featureId}`
      : `Failed to updated Productboard feature ${featureId}. Error [${res.status}] ${res.data}`,
  );
  return res.status === 200;
};

const productboardReqConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${env.productboardApiToken}`,
    'Content-Type': 'application/json',
    'X-Version': 1,
  },
};
