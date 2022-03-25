import { createStatePreservedDescription, delimiter, extractProgress } from './productboard';

const date = `2022-03-28T02:57:56.638Z`;

describe(`extraction`, () => {
  it(`GIVEN extraction WHEN not valid object THEN returns undefined`, () => {
    expect(extractProgress(`<p>xyz${delimiter}123</p>`)).toBeUndefined();
  });
  it(`GIVEN extraction WHEN valid object THEN extract progress`, () => {
    expect(extractProgress(`{"updatedAt": "${date}", "progress":0.5}${delimiter}State to preserve`)).toBe(0.5);
  });
});
describe(`create description`, () => {
  it(`GIVEN state WHEN update WITH NO progress change THEN return same`, () => {
    expect(
      createStatePreservedDescription(() => new Date(date))(
        0.5,
        `{"updatedAt": "${date}", "progress":0.5}${delimiter}State to preserve`,
      ),
    ).toBeUndefined();
  });
  it(`GIVEN state WHEN update WITH progress change THEN return updated`, () => {
    expect(
      createStatePreservedDescription(() => new Date(date))(
        0.6,
        `{"updatedAt":"${date}","progress":0.5}${delimiter}State to preserve`,
      ),
    ).toBe(`{
  "updatedAt": "2022-03-28T02:57:56.638Z",
  "progress": 0.6
}

{"updatedAt":"2022-03-28T02:57:56.638Z","progress":0.5}${delimiter}State to preserve`);
  });

  it(`GIVEN no state WHEN update WITH progress change THEN return same`, () => {
    expect(createStatePreservedDescription(() => new Date(date))(0.6, ``)).toEqual(
      `{
  "updatedAt": "${date}",
  "progress": 0.6
}

${delimiter}`,
    );
  });
});
