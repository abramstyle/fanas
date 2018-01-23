import stringUtils from '../string';

describe('stringUtils', () => {
  test('camelCase', () => {
    const camelCase = stringUtils.camelCase();

    const str1 = 'a-b';
    const str2 = 'c_d';
    const str3 = 'a-b';
    const str4 = 'eF';

    expect(camelCase).toBeInstanceOf(Function);
    expect(camelCase(str1)).toBe('aB');
    expect(camelCase(str2)).toBe('cD');
    expect(camelCase(str3)).toBe('aB');
    expect(camelCase(str4)).toBe('eF');
  });

  test('toParamCase', () => {
    const str1 = 'lorem aaa';
    expect(stringUtils.toParamCase(str1)).toBe('lorem-aaa');
  });
});
