import * as z from 'zod';

export const constructSafeParseError = (message: string): z.SafeParseError<{}> => {
  return {
    error: new z.ZodError([
      {
        path: [],
        code: 'custom',
        message,
      },
    ]),
    success: false,
  };
};
