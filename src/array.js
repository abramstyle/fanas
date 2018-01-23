import objectUtils from './object';
import defaultUtils from '.';

const arrayUtils = {
  uniq(array) {
    if (!Array.isArray(array)) return false;
    return array.reduce((uniqArr, currItem) => {
      if (objectUtils.isObject(currItem) && arrayUtils.getIndexByProp(uniqArr, currItem) === -1) {
        uniqArr.push(currItem);
      } else if (!objectUtils.isObject(currItem) && uniqArr.indexOf(currItem) === -1) {
        uniqArr.push(currItem);
      }

      return uniqArr;
    }, []);
    // array.filter(function(item, index, currentArray){
    //  return currentArray.index(item)===index;
    // })
  },

  // merge arrays
  // merge Cart Items
  merge(...arrays) {
    const isValidParam = arrays.every(array => Array.isArray(array));

    if (!isValidParam) {
      throw new Error('every param mast be array!');
    }

    const newArray = arrays.reduce((newItems, currentArray) => {
      newItems = currentArray.reduce((newSubItems, currentSubItem) => {
        const sameItem = arrayUtils.findOne(newItems, { id: currentSubItem.id });

        const newItem = Object.assign({}, currentSubItem);

        if (sameItem) {
          newSubItems = newSubItems.map((item) => {
            if (item.id === sameItem.id) {
              return Object.assign({}, newItem, {
                quantity: newItem.quantity + sameItem.quantity,
              });
            }
            return item;
          });
        } else {
          newSubItems.push(newItem);
        }

        return newSubItems;
      }, newItems);

      return newItems;
    }, []);

    return newArray;
  },

  contains(array, condition) {
    return array.some(item =>
      Object.keys(condition).every(key => item[key] === condition[key]));
  },

  findOne(array, condition) {
    if (!array) {
      array = [];
    }
    const result = array.filter(item =>
      Object.keys(condition).every(key => item[key] === condition[key]));

    return result.length > 0 && result[0];
  },

  // TODO:
  // 实现递归 flatten
  // recursive = false
  flatten(arrays) {
    const resultArray = arrays.reduce((array, currentArray) => [...array, ...currentArray], []);
    return resultArray;
  },

  getIndexByProp(arrays, props = {}) {
    let index = -1;
    const keys = Object.keys(props);
    arrays.every((item, idx) => {
      if (keys.filter(key => props[key] === item[key]).length === keys.length) {
        index = idx;
        return false;
      }
      return true;
    });
    return index;
  },

  isEqual(array, otherArray) {
    if (!Array.isArray(array) || !Array.isArray(otherArray)) return false;
    if (array.length !== otherArray.length) return false;

    return array.every((item, index) => {
      const otherItem = otherArray[index];

      if (!defaultUtils.isSameType(item, otherItem)) return false;

      if (Array.isArray(item)) {
        return arrayUtils.isEqual(item, otherItem);
      }

      if (typeof item === 'object') {
        return objectUtils.isEqual(item, otherItem);
      }

      if (item === otherItem) return true;


      return false;
    });
  },

  grouping(items, key = 'id') {
    return items.reduce((groups, item) => {
      const existGroup = groups.find(groupItem => groupItem[key] === item[key]);
      if (existGroup) {
        existGroup.items.push(item);
      } else {
        const groupItem = { [key]: item[key], items: [item] };
        groups.push(groupItem);
      }
      return groups;
    }, []).map(groupItem => groupItem.items);
  },
};

export default arrayUtils;
