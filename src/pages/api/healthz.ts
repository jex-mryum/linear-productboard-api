import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method } = req;
  method === `GET`
    ? res.status(200).send({
        message: `Service is healthy`,
      })
    : res.status(400).send({
        message: `Forbidden method`,
      });
};
