import cookieUtils from '../cookie';

describe('cookieUtils', () => {
  const cookieStr1 = 'rflag=NO_REDIRECT: US  8; path=/; domain=abram.style';
  const cookieStr2 = 'country=US; path=/; expires=Sun, 26 Nov 2017 09:44:18 GMT; domain=.abram.style';
  const cookieStr3 = 'name=Abram;PATH=/;MAX-AGE=86400';

  test('parseCookie', () => {
    expect(cookieUtils.parseCookie(cookieStr1)).toEqual({
      key: 'rflag',
      value: 'NO_REDIRECT: US  8',
      options: {
        path: '/',
        domain: 'abram.style',
      },
    });

    expect(cookieUtils.parseCookie(cookieStr2)).toEqual({
      key: 'country',
      value: 'US',
      options: {
        path: '/',
        expires: new Date('Sun, 26 Nov 2017 09:44:18 GMT'),
        domain: '.abram.style',
      },
    });

    expect(cookieUtils.parseCookie(cookieStr3)).toEqual({
      key: 'name',
      value: 'Abram',
      options: {
        PATH: '/',
        'MAX-AGE': '86400',
      },
    });
  });
});
