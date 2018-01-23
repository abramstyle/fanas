import defaultUtils from '..';

describe('defaultUtils', () => {
  test('isSameType', () => {
    expect(defaultUtils.isSameType([], [])).toBeTruthy();
    expect(defaultUtils.isSameType({}, null)).toBeFalsy();
    expect(defaultUtils.isSameType([], {})).toBeFalsy();
    expect(defaultUtils.isSameType(1, 2)).toBeTruthy();
    expect(defaultUtils.isSameType(true, false)).toBeTruthy();
    expect(defaultUtils.isSameType({}, {})).toBeTruthy();
    expect(defaultUtils.isSameType('str', 'str')).toBeTruthy();
    expect(defaultUtils.isSameType([], 'str')).toBeFalsy();
  });
});
