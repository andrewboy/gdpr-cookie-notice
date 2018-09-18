import { default as template } from './template'
import * as locales from './locales'
import Cookies from 'js-cookie'
import './sass/main.scss'

// function gdprCookieNotice (extOpts) {
//   let defOpts = {
//     locale: 'hu',
//     timeout: 500,
//     domain: null,
//     expiration: 30,
//     defaultChecked: false,
//     namespace: 'gdprcookienotice',
//     pluginPrefix: 'gdpr-cookie-notice'
//   }
//   let opts = Object.assign({}, defOpts, extOpts)
//
//   let categories = []
//   let currentCookieSelection = getCookie()
//
//   console.log('gdprCookieNotice', locales, locales.hu, template)
//   console.log(currentCookieSelection)
//
//   // if (!currentCookieSelection) {
//     showNotice()
//   // } else {
//   //
//   // }
//
//   function showNotice () {
//     buildNotice()
//
//     // setTimeout(function(){
//     //   document.documentElement.classList.add(pluginPrefix+'-loaded');
//     // }, config.timeout);
//   }
//
//   function buildNotice () {
//     document.body.insertAdjacentHTML('beforeend', getTemplateHtml('bar', locales[opts.locale]))
//   }
//
//   function getTemplateHtml (templateKey, data) {
//     let templateStr = template[templateKey]
//
//     console.log('templateStr', templateStr, data)
//
//     if (typeof templateStr === 'string' && (data instanceof Object)) {
//         return templateStr.replace(/{{([^}]+)}}/g, function (i, j) {
//           if (data[j]) {
//             return data[j]
//           } else {
//             return i
//           }
//         })
//     } else {
//       return false
//     }
//   }
//
//   function getCookie () {
//     return Cookies.getJSON(opts.namespace)
//   }
// }

class GdprCookieNotice {
  constructor (options) {
    this._locale = options.locale ? options.locale : 'hu'
    this._timeout = options.timeout ? options.timeout : 500
    this._domain = options.domain ? options.domain : null
    this._expiration =options.expiration ? options.expiration : 30
    this._defaultChecked = options.setDefaultChecked ? options.setDefaultChecked : false
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice'
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice'

    console.log('gdprCookieNotice', locales, locales.hu, template)
    console.log(this.getCurrentCookieSelection())

    this.showNotice()
  }

  showNotice() {
    this.buildNotice()
  }

  buildNotice () {
    document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml('bar', locales[this._locale]))
  }

  getTemplateHtml (templateKey, data) {
    let templateStr = template[templateKey]

    console.log('templateStr', templateStr, data)

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

  getCurrentCookieSelection () {
    return Cookies.getJSON(this._namespace)
  }

  set locale (locale) {
    this._locale = locale
  }

  get locale () {
    return this._locale
  }

  set timeout (timeout) {
    this._timeout = timeout
  }

  get timeout () {
    return this._timeout
  }

  set domain (domain) {
    this._domain = domain
  }

  get domain () {
    return this._domain
  }

  set expiration (expiration) {
    this._expiration = expiration
  }

  get expiration () {
    return this._expiration
  }

  set defaultChecked (isDefaultChecked) {
    this._defaultChecked = isDefaultChecked
  }

  get defaultChecked () {
    return this._defaultChecked
  }

  set namespace (namespace) {
    this._namespace = namespace
  }

  get namespace () {
    return this._namespace
  }

  set pluginPrefix (pluginPrefix) {
    this._pluginPrefix = pluginPrefix
  }

  get pluginPrefix () {
    return this._pluginPrefix
  }
}

// export default { gdprCookieNotice }
export default { GdprCookieNotice }