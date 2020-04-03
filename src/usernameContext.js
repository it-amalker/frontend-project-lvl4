import React from 'react';
import Cookies from 'js-cookie';
import faker from 'faker';

export const setUsernameCookies = () => {
  const username = faker.fake("{{internet.userName}}");
  if (!Cookies.get('username')) {
    Cookies.set('username', username);
  }
};

export default React.createContext(Cookies.get('username'));