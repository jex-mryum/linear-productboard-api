import { isJSONString } from './json';

describe(`isJSONString`, () => {
  it(`valid json string`, () => {
    expect(isJSONString(`{"property": "value"}`)).toEqual(true);
  });
  it(`invalid json string`, () => {
    expect(isJSONString(`not a valid string`)).toEqual(false);
  });
});
