import * as z from 'zod';
import { ProgressUpdate } from '../../domain/productboard';

export const parseProgressUpdate = (extracted: {}): z.SafeParseReturnType<{}, ProgressUpdate> =>
  z
    .object({
      featureId: z.string(),
      progress: z.number(),
    })
    .safeParse(extracted);
