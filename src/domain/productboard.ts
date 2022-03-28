import { retrieveState, updatePBFeatureById } from '../http/productboard';

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

  const createNewDescription = useStatePreservingDescription();

  return (await updatePBFeatureById(featureId, createNewDescription(progress, state)))
    ? UpdateOutcome.Updated
    : UpdateOutcome.Failed;
};

export const useStatePreservingDescription =
  (now = () => new Date()) =>
  (progress: number, state: string): string => {
    const updatedAt = now();
    const preserved =
      state.indexOf(delimiter) !== -1
        ? state.substring(state.indexOf(delimiter) + delimiter.length, state.length)
        : state;

    return JSON.stringify({ updatedAt, progress }, null, 2).concat(`\n\n`, delimiter, `\n\n`, preserved);
  };

export const parseHTMLParatoString = (rawHTML: string): string =>
  rawHTML
    .split(new RegExp(/<p>|<\/p>|<br \/>/))
    .join(`\n`)
    .split(new RegExp(/&quot;/))
    .join('"');
