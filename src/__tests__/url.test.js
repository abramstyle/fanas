import url from 'url';
import urlUtils from '../url';

describe('urlUtils', () => {
  test('getFriendlyUrl', () => {
    expect(urlUtils.getFriendlyUrl('a  b c')).toBe('a-b-c');
    expect(urlUtils.getFriendlyUrl('')).toBe('');
  });

  test('getQueryObject', () => {
    expect(urlUtils.getQueryObject()).toEqual({});
    expect(urlUtils.getQueryObject('?a=1&b=2')).toEqual({
      a: '1',
      b: '2',
    });
    expect(urlUtils.getQueryObject('a=1&b=2')).toEqual({
      a: '1',
      b: '2',
    });
  });

  test('mergeQuerystring', () => {
    expect(urlUtils.mergeQuerystring('http://a.b.co')).toBe('http://a.b.co');
    expect(urlUtils.mergeQuerystring('http://a.b.co', {})).toBe('http://a.b.co/');
    expect(urlUtils.mergeQuerystring('http://a.b.co', { a: 1, b: 2 })).toBe('http://a.b.co/?a=1&b=2');
    expect(urlUtils.mergeQuerystring('http://a.b.co?c=3', { a: 1, b: 2 })).toBe('http://a.b.co/?c=3&a=1&b=2');
    expect(urlUtils.mergeQuerystring('http://a.b.co/path/to', { a: 1, b: 2 })).toBe('http://a.b.co/path/to?a=1&b=2');
    expect(urlUtils.mergeQuerystring('http://a.b.co/path/to?c=3', { a: 1, b: 2 })).toBe('http://a.b.co/path/to?c=3&a=1&b=2');
  });

  test('parseUrl', () => {
    expect(urlUtils.parseUrl('http://a.b.co?a=1')).toEqual(url.parse('http://a.b.co?a=1', true));
  });
});
