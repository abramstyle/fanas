import url from 'url';
import querystring from 'querystring';
import objectUtils from './object';


const urlUtils = {
  getFriendlyUrl(urlString) {
    return (urlString || '').toLowerCase().replace(/\s+/g, '-');
  },

  getQueryObject(search) {
    if (!search) return {};
    const query = search.charAt(0) === '?' ? search.substring(1) : search;
    // search中可能存在多个问号的情况
    return querystring.parse(query.replace(/\?/g, '&'));
  },

  mergeQuerystring(urlstring, queryObject) {
    if (!objectUtils.isObject(queryObject)) return urlstring;
    const urlObject = url.parse(urlstring, true);
    Object.assign(urlObject, {
      query: Object.assign(urlObject.query, queryObject),
    });
    const search = querystring.stringify(urlObject.query);
    urlObject.search = search ? `?${search}` : null;

    return url.format(urlObject);
  },

  parseUrl(urlString) {
    return url.parse(urlString, true);
  },
};

export default urlUtils;
