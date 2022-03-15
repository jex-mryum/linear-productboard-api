import isISODate from '../utils/iso-string';
describe(`iso-string`, () => {
  it(`success cases`, () => {
    expect(isISODate('2015-02-21T00:52:43.822Z')).toBe(true);
    expect(isISODate('2015-02-21T00:52:43Z')).toBe(true);
    expect(isISODate('2015-02-21T00:52Z')).toBe(true);
  });
  it(`fail cases`, () => {
    expect(isISODate('2015-02-21T00:52:43.822')).toBe(false);
    expect(isISODate('2015-02-21T00:52:43')).toBe(false);
    expect(isISODate('2015-02-21T00Z')).toBe(false);
    expect(isISODate('2015-02-21T00:52')).toBe(false);
  });
});
