import * as z from 'zod';
import { retrieveState, usePBUpdater } from '../http/productboard';
import { isJSONString } from '../utils/json';
import { logger } from '../utils/log';

export interface ProgressUpdate {
  featureId: string;
  progress: number;
}

export enum UpdateOutcome {
  Updated = `Progress updated`,
  Unchanged = `Progress unchanged`,
  Failed = `Attempt failed`,
}

export const delimiter = `DO_NOT_DELETE_linear_productboard_integration_delimiter`;

export const updateProductboard = async (update: ProgressUpdate): Promise<UpdateOutcome> => {
  const { featureId, progress } = update;
  const raw = await retrieveState(featureId);
  const state = parseHTMLParatoString(raw);
  const updatedAt = new Date().toISOString();

  const updatePBFeatureById = usePBUpdater(featureId);

  if (state.indexOf(delimiter) === -1) {
    logger.info(`No delimiter was found in the current description`);
    return (await updatePBFeatureById(
      JSON.stringify({ updatedAt, progress }, null, 2).concat(`\n\n`, delimiter, `\n\n`, state),
    ))
      ? UpdateOutcome.Updated
      : UpdateOutcome.Failed;
  }

  const current = extractProgress(state);
  if (current && progress === current) {
    logger.info(`Update progress matched the current progress value in the description`);
    return UpdateOutcome.Unchanged;
  }

  if (!current && state.indexOf(delimiter) !== -1) {
    logger.info(`No current progress was found above the delimiter in the description`);
    return (await updatePBFeatureById(JSON.stringify({ updatedAt, progress }, null, 2).concat(`\n\n`, state)))
      ? UpdateOutcome.Updated
      : UpdateOutcome.Failed;
  }

  if (current && current !== progress) {
    logger.info(`Updated progress is different to the current value in the description`);
    return (await updatePBFeatureById(JSON.stringify({ updatedAt, progress }, null, 2).concat(`\n\n`, state)))
      ? UpdateOutcome.Updated
      : UpdateOutcome.Failed;
  }
  return UpdateOutcome.Failed;
};

export const createStatePreservedDescription =
  (now = () => new Date()) =>
  (progress: number, state: string): string | undefined => {
    const updatedAt = now();
    if (state.indexOf(delimiter) === -1) {
      return JSON.stringify({ updatedAt, progress }, null, 2).concat(`\n\n`, delimiter, state);
    }
    const current = extractProgress(state);
    if (current && current !== progress) {
      return JSON.stringify({ updatedAt, progress }, null, 2).concat(`\n\n`, state);
    }
  };

export const extractProgress = (rawState: string): number | undefined => {
  const state = parseHTMLParatoString(rawState);
  const extracted = state.substring(0, state.indexOf(delimiter));
  const obj = extracted.substring(extracted.indexOf('{'), extracted.indexOf('}') + 1);
  const flat = obj.split(`\n`).join('');
  if (!isJSONString(flat)) {
    logger.info(`Extracted pre-deliminator body was not parsable into JSON: ${flat}`);
    return undefined;
  }
  const parsed = z.object({ progress: z.number().transform(n => Number(n.toFixed(2))) }).safeParse(JSON.parse(flat));
  return parsed.success ? parsed.data.progress : undefined;
};

export const parseHTMLParatoString = (rawHTML: string): string =>
  rawHTML
    .split(new RegExp(/<p>|<\/p>|<br \/>/))
    .join(`\n`)
    .split(new RegExp(/&quot;/))
    .join('"');
