/* global describe, test, expect */
import arrayUtils from '../array';

const array1 = [{
  id: 1,
  quantity: 2,
}, {
  id: 2,
  quantity: 3,
}, {
  id: 3,
  quantity: 3,
}];

const array2 = [{
  id: 2,
  quantity: -1,
}, {
  id: 4,
  quantity: 5,
}, {
  id: 1,
  quantity: 5,
}];

const array3 = [{
  id: 1,
  quantity: 7,
}, {
  id: 2,
  quantity: 2,
}, {
  id: 3,
  quantity: 3,
}, {
  id: 4,
  quantity: 5,
}];

const array4 = [{
  id: 1,
}, {
  id: 3,
}, {
  id: 1,
}, {
  id: 4,
}, {
  id: 3,
}];

const array5 = [
  1,
  2,
  4,
  2,
  1,
];

const array6 = [{
  id: 1,
  quantity: 2,
}, {
  id: 2,
  quantity: 3,
}, {
  id: 3,
  quantity: 3,
}];


const array7 = [
  { id: 1, quantity: 1 },
  { id: 1, quantity: 2 },
  { id: 2, quantity: 3 },
  { id: 3, quantity: 3 },
  { id: 3, quantity: 4 },
  { id: 3, quantity: 3 },
];


const condition = {
  id: 3,
};

const functionCondition = item => item.id === 2;

const nestedArray = [[1, 2], [3, 4], [[5]]];

describe('arrayUtils', () => {
  test('uniq', () => {
    expect(arrayUtils.uniq(array4)).toEqual([{
      id: 1,
    }, {
      id: 3,
    }, {
      id: 4,
    }]);

    expect(arrayUtils.uniq(array5)).toEqual([1, 2, 4]);
  });

  test('merge', () => {
    expect(arrayUtils.merge(array1, array2)).toEqual(array3);
  });

  test('contains', () => {
    expect(arrayUtils.contains(array1, condition)).toBe(true);
  });

  test('findOne', () => {
    expect(arrayUtils.findOne(array1, condition)).toEqual({
      id: 3,
      quantity: 3,
    });

    expect(arrayUtils.findOne(array1, functionCondition)).toEqual({
      id: 2,
      quantity: 3,
    });
  });

  test('flatten', () => {
    expect(arrayUtils.flatten(nestedArray)).toEqual([1, 2, 3, 4, [5]]);
  });

  test('getIndexByProp', () => {
    expect(arrayUtils.getIndexByProp(array3, {
      id: 1,
    })).toBe(0);

    expect(arrayUtils.getIndexByProp(array3, {
      id: 1,
      quantity: 7,
    })).toBe(0);

    expect(arrayUtils.getIndexByProp(array3, {
      id: 5,
    })).toBe(-1);

    expect(arrayUtils.getIndexByProp(array3, {
      id: 5,
      quantity: 7,
    })).toBe(-1);
  });

  test('isEqualArray', () => {
    expect(arrayUtils.isEqual(array1, array2)).toBeFalsy();
    expect(arrayUtils.isEqual(array1, array6)).toBeTruthy();
  });


  test('grouping by id', () => {
    expect(arrayUtils.grouping(array7, 'id')).toEqual([
      [
        { id: 1, quantity: 1 },
        { id: 1, quantity: 2 },
      ],
      [
        { id: 2, quantity: 3 },
      ],
      [
        { id: 3, quantity: 3 },
        { id: 3, quantity: 4 },
        { id: 3, quantity: 3 },
      ],
    ]);
  });

  test('grouping by quantity', () => {
    expect(arrayUtils.grouping(array7, 'quantity')).toEqual([
      [
        { id: 1, quantity: 1 },
      ],
      [
        { id: 1, quantity: 2 },
      ],
      [
        { id: 2, quantity: 3 },
        { id: 3, quantity: 3 },
        { id: 3, quantity: 3 },
      ],
      [
        { id: 3, quantity: 4 },
      ],
    ]);
  });
});
