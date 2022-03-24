import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../utils/environment';

export const updatePBFeatureById = async (id: string, progress: number) => {
  const res: AxiosResponse = await axios.put(
    `${env.productboardApiBaseUrl}/features/${id}`,
    {
      data: {
        description: `<p>Progress: ${progress * 100}%</p>`,
      },
    },
    productboardReqConfig,
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
