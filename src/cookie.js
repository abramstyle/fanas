const cookieUtils = {
  parseCookie(cookieString) {
    const part = cookieString.split(';');
    const cookieObject = {
      key: '',
      value: '',
      options: {},
    };

    if (Array.isArray(part) && part.length > 0) {
      part.forEach((item, index) => {
        if (index === 0) {
          const cookieItem = part[0].trim().split('=');
          if (Array.isArray(cookieItem) && cookieItem.length > 0) {
            cookieObject.key = cookieItem[0].trim();
            cookieObject.value = cookieItem[1].trim();
          }
        } else {
          const cookieOption = item.trim().split('=');

          if (Array.isArray(cookieOption) && cookieOption.length > 0) {
            const key = cookieOption[0].trim();
            let value = cookieOption[1] ? cookieOption[1].trim() : true;

            if (key === 'expires') {
              value = new Date(value);
            }
            cookieObject.options[key] = value;
          }
        }
      });
    }

    return cookieObject;
  },
};

export default cookieUtils;
