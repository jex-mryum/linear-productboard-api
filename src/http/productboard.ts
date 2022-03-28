import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../utils/environment';
import { logger } from '../utils/log';

export const updatePBFeatureById = async (featureId: string, update: string): Promise<boolean> => {
  const res: AxiosResponse = await axios.put(
    `${env.productboardApiBaseUrl}/features/${featureId}`,
    {
      data: {
        description: `<p>${update}</p>`,
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

export const retrieveState = async (featureId: string): Promise<string> => {
  const feature: AxiosResponse = await axios.get(
    `${env.productboardApiBaseUrl}/features/${featureId}`,
    productboardReqConfig,
  );
  return String(feature.data.data.description);
};

const productboardReqConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${env.productboardApiToken}`,
    'Content-Type': 'application/json',
    'X-Version': 1,
  },
};
