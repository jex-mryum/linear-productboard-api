import * as z from 'zod';
require('dotenv').config();

export const env = z
  .object({
    productboardApiToken: z.string().nonempty(),
    productboardApiBaseUrl: z.string().nonempty(),
    linearApiKey: z.string().nonempty(),
  })
  .parse({
    productboardApiToken: process.env.PRODUCTBOARD_API_TOKEN,
    productboardApiBaseUrl: process.env.PRODUCTBOARD_API_BASE_URL,
    linearApiKey: process.env.LINEAR_API_KEY,
  });
