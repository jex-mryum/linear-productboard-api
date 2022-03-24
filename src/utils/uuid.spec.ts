import isUUIDv4 from './uuid';

describe(`uuid`, () => {
  it(`\nGIVEN uuid parser \nWHEN valid uuid \nTHEN returns true`, () => {
    expect(isUUIDv4(`9b8f754f-8a9d-4a4a-bc66-7b992cce0427`)).toBe(true);
  });
  it(`\nGIVEN uuid parser \nWHEN invalid string \nTHEN returns false`, () => {
    expect(isUUIDv4(`this-is-not-a-uuid`)).toBe(false);
  });
});
