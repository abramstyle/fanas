import objectUtils from '../object';

describe('Object', () => {
  test('getKeys', () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };

    expect(objectUtils.getKeys(object)).toEqual(['a', 'b', 'c']);
  });

  test('isObject', () => {
    expect(objectUtils.isObject({})).toBeTruthy();
    expect(objectUtils.isObject(null)).toBeFalsy();
    expect(objectUtils.isObject([])).toBeFalsy();
    expect(objectUtils.isObject(1)).toBeFalsy();
  });

  test('contains', () => {
    expect(objectUtils.contains({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBeTruthy();
    expect(objectUtils.contains({ a: 1, b: 2 }, { a: 1, c: 3 })).toBeFalsy();
    expect(objectUtils.contains({ a: 1, b: 2 }, { a: 1, b: 2, c: undefined })).toBeFalsy();
  });

  test('hasKey', () => {
    const object = {
      a: 1,
      b: 2,
    };

    expect(objectUtils.hasKey(object, 'a')).toBeTruthy();
    expect(objectUtils.hasKey(object, 'c')).toBeFalsy();
  });

  test('omit', () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };
    try {
      objectUtils.omit(object, 'a');
    } catch (e) {
      expect(e).toEqual(new Error('expect keys as an array'));
    }
    expect(objectUtils.omit(object, ['a'])).toEqual({
      b: 2,
      c: 3,
      d: 4,
    });
    expect(objectUtils.omit(object, ['a', 'b'])).toEqual({
      c: 3,
      d: 4,
    });
    expect(objectUtils.omit(object, ['a', 'c', 'e'])).toEqual({
      b: 2,
      d: 4,
    });
  });

  test('isItem', () => {
    expect(objectUtils.isItem({ id: 111, quantity: 2 })).toBeTruthy();
    expect(objectUtils.isItem({ id: 222 })).toBeFalsy();
    expect(objectUtils.isItem({})).toBeFalsy();
  });

  test('isEqualItem', () => {
    expect(objectUtils.isEqualItem({ id: 1 }, { id: 2 })).toBeFalsy();
    expect(objectUtils.isEqualItem({ id: 1 }, { id: 1 })).toBeTruthy();
  });

  test('isSame', () => {
    const object1 = {
      a: 1,
      b: 2,
    };

    const object2 = {
      a: 3,
      b: 4,
    };

    const object3 = {
      a: 3,
      c: 3,
    };

    expect(objectUtils.isSame(object1, object2)).toBeTruthy();
    expect(objectUtils.isSame(object1, object3)).toBeFalsy();
  });

  test('isEqual', () => {
    const object1 = {
      a: 1,
      b: 2,
    };
    const object2 = {
      a: 1,
      b: 2,
    };
    const object3 = {
      a: {
        b: 1,
        c: 2,
      },
      d: 3,
    };
    const object4 = {
      a: {
        b: 1,
        c: 2,
      },
      d: 3,
    };

    expect(objectUtils.isEqual(object1, object2)).toBeTruthy();
    expect(objectUtils.isEqual(object3, object4)).toBeTruthy();
    expect(objectUtils.isEqual(object1, object4)).toBeFalsy();
    expect(objectUtils.isEqual(object1, [])).toBeFalsy();
    expect(objectUtils.isEqual([], object1)).toBeFalsy();
  });

  test('toCamelCase', () => {
    const object = {
      a_b: 1,
      c_d: 2,
      e_f: {
        g_h: 3,
        i_j: {
          k_l: 4,
        },
      },
    };
    const arr = [{
      a_b: 1,
      c_d: 2,
    }, {
      e_f: {
        g_h: 3,
        i_j: {
          k_l: 4,
        },
      },
    }];
    expect(objectUtils.toCamelCase(object)).toEqual({
      aB: 1,
      cD: 2,
      eF: {
        gH: 3,
        iJ: {
          kL: 4,
        },
      },
    });
    expect(objectUtils.toCamelCase(arr)).toEqual([{
      aB: 1,
      cD: 2,
    }, {
      eF: {
        gH: 3,
        iJ: {
          kL: 4,
        },
      },
    }]);
    expect(objectUtils.toCamelCase()).toBe(undefined);
  });

  test('toJSON', () => {
    expect(objectUtils.toJSON({ a_b: 1, c_d: 2 })).toBe('{"aB":1,"cD":2}');
    expect(objectUtils.toJSON({ a_b: 1, c_d: 2 }, false)).toBe('{"a_b":1,"c_d":2}');
  });
});
