// import { default as template } from './template'
import * as locales from './locales'
// import './sass/gdpr-cookie-notice.scss'
// import "sass/modal/_variables.scss";
// import "sass/notice2/_variables.scss";

import GdprCookie from './GdprCookie'
import GdprCookieNoticePopup from './GdprCookieNoticePopup'
import GdprCookieModal from './GdprCookieModal'

// GdprCookieNotice =======================================================

class GdprCookieNotice {
  constructor (options) {
    console.log('GdprCookieNotice:constructor')
    this.load(options)
  }

  _getNotice () {
    return new GdprCookieNoticePopup(
      this,
      this._opts.pluginPrefix,
      locales[this._opts.locale]['notice'],
      this._opts.timeout,
      this._opts.statementUrl
    )
  }

  _getModal () {
    return new GdprCookieModal(
      this,
      this._opts.pluginPrefix,
      locales[this._opts.locale]['modal'],
      this._opts.isCategoriesCheckedByDefault
    )
  }

  load (options) {
    //remove actual
    this.destroy()

    //reset options
    this._opts = Object.assign({}, {
      categories: {},
      implicit: false,
      //cookie
      namespace: 'gdprcookienotice',
      expiration: 30,
      domain: window.location.hostname,
      //boxes
      pluginPrefix: 'gdpr-cookie-notice',
      locale: 'hu',
      //notice
      timeout: 500,
      statementUrl: '',
      //modal
      isCategoriesAcceptedByDefault: false
    }, options)

    //cookie
    this._gdprCookie = new GdprCookie(this._opts.namespace, this._opts.expiration, this._opts.domain)
    //notice
    this._notice = this._getNotice()
    //modal
    this._modal = this._getModal()

    if (!this._gdprCookie.isExists()) {
      this._notice.show()

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    } else {
      //   this.deleteCookies(this.getCurrentCookieSelection())
      this._fireCookieEnvabledEvent()
    }

    this._setModalShowButton()
  }

  destroy () {
    if (this._notice) {
      this._notice.destroy()
    }

    if (this._modal) {
      this._modal.destroy()
    }
  }

  _setModalShowButton () {
    let globalSettingsButtons = document.querySelectorAll('.' + this._opts.pluginPrefix + '-settings-button')

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

  _fireCookieEnvabledEvent () {
    this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', {detail: this._gdprCookie.get()})
    document.dispatchEvent(this._gdprCookiesEnabledEvt)
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
      !!this._opts.categories.performance,
      !!this._opts.categories.analytics,
      !!this._opts.categories.marketing,
    )
  }

  //COOKIE =============================================================================================================

  acceptCategories (isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted) {
    console.log('acceptCategories', isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted)
    // Load marketing scripts that only works when cookies are accepted
    this._gdprCookie.set(
      true,
      isPerformanceAccepted,
      isAnalyticsAccepted,
      isMarketingAccepted
    )
    this._fireCookieEnvabledEvent()

    if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
      this._notice.hide()
    } else {
      this._notice.show()
    }
  }
}

export default {GdprCookieNotice}