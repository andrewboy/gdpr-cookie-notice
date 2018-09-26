import { default as template } from './template'
import * as locales from './locales'
import './sass/gdpr-cookie-notice.scss'
import GdprCookie from './GdprCookie'
import GdprCookieNotice2 from './GdprCookieNotice2'
import GdprCookieModal from './GdprCookieModal'

// GdprCookieNotice =======================================================

class GdprCookieNotice {
  constructor (options) {
    console.log('GdprCookieNotice:constructor')
    this._categories = options.categories ? options.categories : []
    // this._implicit = options.implicit ? options.implicit : false
    // this._cookiesAccepted = false
    //COOKIE
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice'
    this._expiration = options.expiration ? options.expiration : 30
    this._domain = options.domain ? options.domain : window.location.hostname
    this._gdprCookie = new GdprCookie(this._namespace, this._expiration, this._domain)

    //BOXES
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice'
    this._locale = options.locale ? options.locale : 'hu'
    //NOTICE
    this._timeout = options.timeout ? options.timeout : 500
    this._statementUrl = options.statementUrl ? options.statementUrl : ''
    this._notice = new GdprCookieNotice2(this)
    //MODAL
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false
    this._modal = new GdprCookieModal(this)

    if (!this._gdprCookie.isExists()) {
      this._notice.show()

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    } else {
      //   this.deleteCookies(this.getCurrentCookieSelection())
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', {detail: this._gdprCookie.get()})
      document.dispatchEvent(this._gdprCookiesEnabledEvt)
    }

    // Settings button on the page somewhere
    let globalSettingsButtons = document.querySelectorAll('.' + this._pluginPrefix + '-settings-button')

    if (globalSettingsButtons) {
      for (let i in globalSettingsButtons) {
        console.log(i, globalSettingsButtons[i])
        globalSettingsButtons[i].addEventListener('click', (e) => {
          e.preventDefault()
          this._modal.show()
        })
      }
    }
  }

  setEvent (evt, data) {
    switch (evt) {
      case 'accept_all_category':
        this.acceptAllCategories()
        break

      case 'accept_categories':
        this.acceptCategories(data.performance, data.analytics, data.marketing)
        break

      case 'show_modal':
        this._modal.show()
        break

      default:
        throw new Error('Event type not supported')
    }
  }

  acceptAllCategories () {
    this.acceptCategories(
      !!this._categories.performance,
      !!this._categories.analytics,
      !!this._categories.marketing,
    )
  }

  //COOKIE =============================================================================================================

  // deleteCookies (savedCookies) {
  //   for (let i in this._categories) {
  //     if (Object.keys(savedCookies).indexOf(i) >= 0 || !savedCookies[i]) {
  //       Cookies.remove(i)
  //     }
  //   }
  //
  //   if (!savedCookies) {
  //     this.showNotice()
  //   } else {
  //     this.hideNotice()
  //   }
  // }

  acceptCategories (isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted) {
    console.log('acceptCategories', isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted)
    // Load marketing scripts that only works when cookies are accepted
    this._gdprCookie.set(
      true,
      isPerformanceAccepted,
      isAnalyticsAccepted,
      isMarketingAccepted
    )
    this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', {detail: this._gdprCookie.get()})
    document.dispatchEvent(this._gdprCookiesEnabledEvt)

    if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
      this._notice.hide()
    } else {
      this._notice.show()
    }
  }

  //GETTER - SETTER ====================================================================================================

  set statementUrl (statementUrl) {
    this._statementUrl = statementUrl
  }

  get statementUrl () {
    return this._statementUrl
  }

  // set implicit (isImplicit) {
  //   this._implicit = isImplicit
  // }
  //
  // get implicit () {
  //   return this._implicit
  // }

  // set cookiesAccepted (isAccepted) {
  //   this._cookiesAccepted = isAccepted
  // }
  //
  // get cookiesAccepted () {
  //   return this._cookiesAccepted
  // }

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

export default {GdprCookieNotice}