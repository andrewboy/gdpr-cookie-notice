import { default as template } from './template'
import * as locales from './locales'
import Cookies from 'js-cookie'

function gdprCookieNotice (extOpts) {
  let defOpts = {
    locale: 'en',
    timeout: 500,
    domain: null,
    expiration: 30,
    defaultChecked: false,
    namespace: 'gdprcookienotice',
    pluginPrefix: 'gdpr-cookie-notice'
  }
  let opts = Object.assign({}, defOpts, extOpts)

  let categories = []
  let currentCookieSelection = getCookie()

  console.log('gdprCookieNotice', locales, locales.hu)
  console.log(currentCookieSelection)

  // if (!currentCookieSelection) {
    showNotice()
  // } else {
  //
  // }

  function showNotice () {
    buildNotice()

    // setTimeout(function(){
    //   document.documentElement.classList.add(pluginPrefix+'-loaded');
    // }, config.timeout);
  }

  function buildNotice () {
    document.body.insertAdjacentHTML('beforeend', getTemplateHtml('bar', locales[opts.locale]))
  }

  function getTemplateHtml (templateKey, data) {
    let templateStr = template[templateKey]

    if (typeof templateStr === 'string' && (data instanceof Object)) {
        return templateStr.replace(/{{([^}]+)}}/g, function (i, j) {
          if (data[j]) {
            return data[j]
          } else {
            return i
          }
        })
    } else {
      return false
    }
  }

  function getCookie () {
    return Cookies.getJSON(opts.namespace)
  }
}

module.exports = {
  gdprCookieNotice: gdprCookieNotice
}