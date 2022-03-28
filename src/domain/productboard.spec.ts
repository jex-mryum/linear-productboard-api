import { useStatePreservingDescription, delimiter } from '../domain/productboard';

describe(`state preserving descriptions`, () => {
  const now = () => new Date(`2020-01-01`);
  const create = useStatePreservingDescription(now);
  const progress = 0.5;

  const delimitedState = `Lorem${delimiter}ipsum`;
  const undelimitedState = `Lorem ipsum`;
  it(`\nGIVEN delimited state \nWHEN create message\nTHEN preserve state below delimiter`, () => {
    expect(create(progress, delimitedState)).toBe(`{
  "updatedAt": "2020-01-01T00:00:00.000Z",
  "progress": 0.5
}

DO_NOT_DELETE_linear_productboard_integration_delimiter

ipsum`);
  });
  it(`\nGIVEN undelimited state \nWHEN create message \nTHEN preserve all state`, () => {
    expect(create(progress, undelimitedState)).toBe(`{
  "updatedAt": "2020-01-01T00:00:00.000Z",
  "progress": 0.5
}

DO_NOT_DELETE_linear_productboard_integration_delimiter

Lorem ipsum`);
  });
});
