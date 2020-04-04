import React from 'react';
import Cookies from 'js-cookie';
import faker from 'faker';

const getUsernameFromCookies = () => {
  const username = faker.fake("{{internet.userName}}");
  if (!Cookies.get('username')) {
    Cookies.set('username', username);
  }
  return Cookies.get('username');
};

export default React.createContext(getUsernameFromCookies());