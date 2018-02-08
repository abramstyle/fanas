import defaultUtils from '.';
import arrayUtils from './array';
import stringUtils from './string';

// object utils
const objectUtils = {
  getKeys(object) {
    return Object.keys(object);
  },

  isObject(object) {
    if (object === null) return false;
    if (Array.isArray(object)) return false;
    return typeof object === 'object';
  },

  contains(object, otherObject) {
    const objectKeys = new Set(Object.keys(object));
    return Object.keys(otherObject).every(key => objectKeys.has(key) && otherObject[key] === object[key]);
  },

  hasKey(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  },

  omit(object, keys) {
    if (!Array.isArray(keys)) {
      throw new Error('expect keys as an array');
    }
    const paths = new Set(keys);
    const resultObject = Object.keys(object).filter(key => !paths.has(key))
      .reduce((result, current) => {
        result[current] = object[current];
        return result;
      }, {});

    return resultObject;
  },

  pick(object, keys) {
    if (!Array.isArray(keys)) {
      throw new Error('expect keys as an array');
    }

    const paths = new Set(keys);
    const resultObject = Object.keys(object).filter(key => paths.has(key))
      .reduce((result, current) => {
        if (!object[current]) return result;
        result[current] = object[current];
        return result;
      }, {});

    return resultObject;
  },

  isItem(object) {
    return objectUtils.hasKey(object, 'id') && objectUtils.hasKey(object, 'quantity');
  },

  isEqualItem(item, otherItem) {
    return item.id === otherItem.id;
  },

  isSame(object, otherObject) {
    const objectKeys = objectUtils.getKeys(object);
    const otherObjectKeys = objectUtils.getKeys(otherObject);

    return arrayUtils.isEqual(objectKeys, otherObjectKeys);
  },

  isEqual(object, otherObject) {
    if (typeof object !== 'object' || typeof otherObject !== 'object') {
      return false;
    }

    const objectKeys = objectUtils.getKeys(object);
    const otherObjectKeys = objectUtils.getKeys(otherObject);

    if (!arrayUtils.isEqual(objectKeys, otherObjectKeys)) {
      return false;
    }

    return objectKeys.every((key) => {
      const item = object[key];
      const otherItem = otherObject[key];

      if (!defaultUtils.isSameType(item, otherItem)) return false;

      if (objectUtils.isItem(item) && objectUtils.isItem(otherItem)) {
        return objectUtils.isEqualItem(item, otherItem);
      }

      if (objectUtils.isObject(item)) {
        return objectUtils.isEqual(item, otherItem);
      }

      if (Array.isArray(item)) {
        return arrayUtils.isEqual(item, otherItem);
      }

      if (item === otherItem) {
        return true;
      }

      return false;
    });
  },

  toCamelCase(object) {
    if (Array.isArray(object)) {
      return object.map(item => objectUtils.toCamelCase(item));
    }

    if (!objectUtils.isObject(object)) {
      return object;
    }

    const camelCase = stringUtils.camelCase();

    return Object.keys(object).reduce((result, key) => {
      const value = object[key];
      const camelCaseKey = camelCase(key);

      if (objectUtils.isObject(value) || Array.isArray(value)) {
        result[camelCaseKey] = objectUtils.toCamelCase(value);
      } else {
        result[camelCaseKey] = value;
      }

      return result;
    }, {});
  },

  toJSON(object, camelCase = true) {
    if (camelCase) {
      return JSON.stringify(objectUtils.toCamelCase(object));
    }

    return JSON.stringify(object);
  },
};

export default objectUtils;
