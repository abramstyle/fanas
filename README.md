# kl-utils

[![npm version](https://badge.fury.io/js/%40abramstyle%2Futils.svg)](https://badge.fury.io/js/%40abramstyle%2Futils)

[![CircleCI](https://circleci.com/gh/abramstyle/utils/tree/master.svg?style=svg)](https://circleci.com/gh/abramstyle/utils/tree/master)

[![Coverage Status](https://coveralls.io/repos/github/abramstyle/utils/badge.svg?branch=master)](https://coveralls.io/github/abramstyle/utils?branch=master)

A light weight javascript utilities to operate object, arrays and another data types.

# Usage
```js
import {objectUtils} from '@abramstyle/utils';

objectUtils.isObject({a: 1});
```

# Types
## default
### `isSameType(item, otherItem)`
check if two item is same type
## Array
### `uniq(array)`
receive an array, and return array that just contains uniq item.
### `merge(...arrays)`
merge arrays, if two item has same id, them quantity will be merged.
### `contains(array, condition)`
check if an array contains a item that has specified condition.
### `findOne(array, condition)`
find object that match specified condition.
### `flatten(arrays)`
flatten array. it a shallow flatten.
### `getIndexByProp(arrays, props = {})`
find index that matched specified condition.
### `isEqual(array, otherArray)`
check it two arrays is same. it uses deep compare.
### `grouping(items, key = 'id')`
return a group that match specified condition.
## Cookie
### `parseCookie(cookieString)`
parse cookie that from headers 'set-cookie', it returns an object.
## Object
### `getKeys(object)`
return all iterable keys from object
### `isObject(object)`
check if item is object, especially typeof null is object.
### `contains(object, otherObject)`
check if object contains specified object keys and them value are equals too.
### `hasKey(object, key)`
return all iterable keys of object.
### `isItem(object)`
check if object is productItem(has "id" and "quantity" attributes)
### `isEqualItem(item, otherItem)`
check if two items has same id
### `isSame(object, otherObject)`
check if two items has same shape.
### `isEqual(object, otherObject)`
check if two object is equal, it uses deep compare.
### `toCamelCase(object)`
convert all keys to camelCase recursively
### `toJSON(object, camelCase = true)`
convert object to json. default to camelCase
## String
### `isString(string)`
check if given item is string.
### `camelCase()`
return a function that convert string to camelCase.
### `toParamCase(string)`
return a string to param case
## Url
### `getFriendlyUrl(urlString)`
return a friendly url that replace all space to dash.
### `getQueryObject(search)`
parse query string from url.
### `mergeQueryString(urlstring, queryObject)`
merge a queryObject to url. if some query already exists, new query will be appended to url.
### `parseUrl(urlString)`
parse url object from url string. query will be parsed to an object too.

# Special Thanks

[AbotChen](https://github.com/abotchen)
