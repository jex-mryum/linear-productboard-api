import axios, { AxiosResponse } from 'axios';

export const useGetFeatureById =
  (baseUrl: string, token: string) =>
  async (featureId: string): Promise<Partial<AxiosResponse>> => {
    return await axios
      .get(`${baseUrl}/features/${featureId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Version': 1,
        },
      })
      .then(response => {
        return response.data;
      });
  };

export const useUpdateFeatureById =
  (baseUrl: string, token: string) =>
  async (featureId: string, update: string): Promise<void> => {
    await axios.put(`${baseUrl}/features/${featureId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Version': 1,
      },
      body: {
        data: {
          description: `<p>${update}</p>`,
        },
      },
    });
  };
