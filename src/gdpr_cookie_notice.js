import template from './template'
import * as locales from './locales'

import Cookies from 'js-cookie'

function gdprCookieNotice (config) {
  let namespace = 'gdprcookienotice';
  console.log('gdprCookieNotice', locales, locales.hu)

  let currentCookieSelection = getCookie(namespace);

  console.log(currentCookieSelection)
}

function getCookie(namespace) {
  return Cookies.getJSON(namespace);
}

module.exports = {
  gdprCookieNotice: gdprCookieNotice
}