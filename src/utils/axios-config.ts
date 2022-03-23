import { AxiosRequestConfig } from 'axios';
import { env } from './environment';

const productboardReqConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${env.productboardApiToken}`,
    'Content-Type': 'application/json',
    'X-Version': 1,
  },
};

export default productboardReqConfig;
