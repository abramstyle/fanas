const defaultUtils = {
  isSameType(item, otherItem) {
    // 全部是数组
    if (Array.isArray(item)) {
      return Array.isArray(otherItem);
    }

    // typeof null returns object
    if (item === null) {
      return otherItem === null;
    }

    if (otherItem === null) {
      return item === null;
    }

    return typeof item === typeof otherItem;
  },
};

export default defaultUtils;
