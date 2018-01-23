import changeCase from 'change-case';

const stringUtils = {
  isString(string) {
    return typeof string === 'string';
  },
  // 为了防止大量字符串的转换引起的性能问题，这里缓存结果
  camelCase() {
    const cachedCase = {};
    return (string) => {
      if (cachedCase[string]) {
        return cachedCase[string];
      }
      const changedCase = changeCase.camelCase(string);
      cachedCase[string] = changedCase;

      return changedCase;
    };
  },

  /**
   * 将字符串转换成小写且以 '-' 作为分隔符的格式
   * @param {string} str - 需要转换的字符串
   * @return {string} - 转换后的字符串
   */
  toParamCase(string) {
    return changeCase.paramCase(string);
  },
};

export default stringUtils;
