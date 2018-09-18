import { default as template } from './template'
import * as locales from './locales'
import Cookies from 'js-cookie'
import './sass/gdpr-cookie-notice.scss'

class GdprCookieNotice {
  constructor (options) {
    this._categories = []
    this._categorySettings = []
    this._locale = options.locale ? options.locale : 'hu'
    this._timeout = options.timeout ? options.timeout : 500
    this._domain = options.domain ? options.domain : window.location.hostname
    this._expiration = options.expiration ? options.expiration : 30
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice'
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice'
    this._implicit = options.implicit ? options.implicit : false
    this._cookiesAccepted = false

    if (options.performance && options.performance.length) {
      this._categorySettings.performance = options.performance
      this._categories.push('performance')
    }

    if (options.analytics && options.analytics.length) {
      this._categorySettings.analytics = options.analytics
      this._categories.push('analytics')
    }

    if (options.marketing && options.marketing.length) {
      this._categorySettings.marketing = options.marketing
      this._categories.push('marketing')
    }

    // console.log('gdprCookieNotice', locales, locales.hu, template)
    // console.log(this.getCurrentCookieSelection())

    this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', {detail: this.getCurrentCookieSelection()})

    if (!this.getCurrentCookieSelection()) {
      this.showNotice()

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    }
    // else {
    //   this.deleteCookies(this.getCurrentCookieSelection())
    //   document.dispatchEvent(this._gdprCookiesEnabledEvt)
    // }

  }

  showNotice () {
    this.buildNotice()
  }

  buildNotice () {
    console.log(this.getTemplateHtml('bar', locales[this._locale]))
    document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml('bar', locales[this._locale]))
  }

  getTemplateHtml (templateKey, data) {
    let templateStr = template[templateKey]

    // console.log('templateStr', templateStr, data)

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

  // deleteCookies (savedCookies) {
    // let notAllEnabled = false
    //
    // for (let i = 0; i < this._categories.length; i++) {
    //   if (config[categories[i]] && !savedCookies[categories[i]]) {
    //     for (var ii = 0; ii < config[categories[i]].length; ii++) {
    //       gdprCookies.remove(config[categories[i]][ii])
    //       notAllEnabled = true
    //     }
    //   }
    // }
    // if (!savedCookies && !gdprCookies) {
    //   showNotice()
    // } else {
    //   hideNotice()
    // }
  // }

  // acceptOnScroll () {
  //   window.addEventListener('scroll', function _listener () {
  //     if (this.amountScrolled()) {
  //       this.acceptCookies()
  //       window.removeEventListener('click', _listener)
  //     }
  //   })
  // }

  // acceptCookies (save) {
  //
  // }

  // amountScrolled () {
  //   let winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
  //   let docheight = this.getDocHeight()
  //   let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
  //   let trackLength = docheight - winheight
  //   let pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
  //   if (pctScrolled > 25 && !this._cookiesAccepted) {
  //     this._cookiesAccepted = true
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  // getDocHeight () {
  //   return Math.max(
  //     document.body.scrollHeight, document.documentElement.scrollHeight,
  //     document.body.offsetHeight, document.documentElement.offsetHeight,
  //     document.body.clientHeight, document.documentElement.clientHeight
  //   )
  // }

  //GETTER - SETTER

  set implicit (isImplicit) {
    this._implicit = isImplicit
  }

  get implicit () {
    return this._implicit
  }

  set cookiesAccepted (isAccepted) {
    this._cookiesAccepted = isAccepted
  }

  get cookiesAccepted () {
    return this._cookiesAccepted
  }

  set categories (categories) {
    this._categories = categories
  }

  get categories () {
    return this._categories
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

  set isCategoriesCheckedByDefault (isCategoriesCheckedByDefault) {
    this._isCategoriesCheckedByDefault = isCategoriesCheckedByDefault
  }

  get isCategoriesCheckedByDefault () {
    return this._isCategoriesCheckedByDefault
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
export default {GdprCookieNotice}