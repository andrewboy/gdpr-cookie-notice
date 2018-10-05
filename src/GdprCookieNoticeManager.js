import GdprCookieModal from './GdprCookieModal'
import * as locales from './locales'
import GdprCookieNoticePopup from './GdprCookieNoticePopup'
import GdprCookie from './GdprCookie'
import Cookies from 'js-cookie'

export default class {
  constructor (options) {
    console.log('GdprCookieNotice:constructor')
    this._opts = {
      categories: {},
      acceptOnScroll: false,
      //cookie
      namespace: 'gdprcookienotice',
      expiration: 30,
      domain: window.location.hostname,
      //boxes
      pluginPrefix: 'gdpr-cookie-notice',
      locale: 'en_GB',
      //notice
      timeout: 500,
      statementUrl: '',
      //modal
      isCategoriesAcceptedByDefault: false
    }
    this._isCookiesAccepted = false
    this.load(options)
  }

  _getNotice () {
    return new GdprCookieNoticePopup(
      this,
      this._opts.pluginPrefix,
      locales[this._opts.locale]['notice'],
      this._opts.timeout
    )
  }

  _getModal () {
    return new GdprCookieModal(
      this,
      this._opts.pluginPrefix,
      locales[this._opts.locale]['modal'],
      this._opts.statementUrl,
      this._opts.isCategoriesCheckedByDefault
    )
  }

  load (options) {
    //remove actual
    this.destroy()

    //reset options
    this._opts = Object.assign({}, this._opts, options)

    //cookie
    this._gdprCookie = new GdprCookie(this._opts.namespace, this._opts.expiration, this._opts.domain)
    //notice
    this._notice = this._getNotice()
    //modal
    this._modal = this._getModal()

    if (!this._gdprCookie.isExists()) {
      console.log('cookie not set')
      this._notice.show()

      if (this._opts.acceptOnScroll) {
        this._acceptOnScroll()
      }
    } else {
      console.log('cookie SET')
      this._deleteUnacceptableCookies()
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

  //acceptonscroll =========

  _acceptOnScroll () {
    window.addEventListener('scroll', function _listener () {
      console.log(this)
      if (this._amountScrolled()) {
        console.log('accepted on scroll')
        this.acceptAllCategories()
        window.removeEventListener('scroll', _listener)
      }
    }.bind(this))
  }

  _amountScrolled () {
    console.log('_amountScrolled')
    let windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight
    let documentHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )
    let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    let trackLength = documentHeight - windowHeight
    let pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    if (pctScrolled > 25 && !this._isCookiesAccepted) {
      this._isCookiesAccepted = true
      return true
    } else {
      return false
    }
  }

  //==============

  _setModalShowButton () {
    let globalSettingsButtons = document.querySelectorAll('.' + this._opts.pluginPrefix + '-settings-button')

    console.log(globalSettingsButtons)

    if (globalSettingsButtons) {
      for (let i = 0; i < globalSettingsButtons.length; i++) {
        console.log('globalSettingsButtons LOOP', i, globalSettingsButtons[i])
        globalSettingsButtons[i].addEventListener('click', (e) => {
          e.preventDefault()
          this._modal.show()
        })
      }
    }
  }

  _fireCookieEnvabledEvent () {
    document.dispatchEvent(new CustomEvent('gdprCookiesEnabled', {detail: this._gdprCookie.get()}))
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

    this._deleteUnacceptableCookies()

    this._fireCookieEnvabledEvent()

    if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
      this._notice.hide()
    } else {
      this._notice.show()
    }
  }

  _deleteUnacceptableCookies () {
    if (!this._gdprCookie.isExists()) {
      return
    }

    //analytics
    if (!!this._opts.categories.analytics && !this._gdprCookie.isAnalyticsAccepted()) {
      for (let i in this._opts.categories.analytics) {
        Cookies.remove(this._opts.categories.analytics[i])
      }
    }

    //performance
    if (!!this._opts.categories.performance && !this._gdprCookie.isPerformanceAccepted()) {
      for (let i in this._opts.categories.performance) {
        Cookies.remove(this._opts.categories.performance[i])
      }
    }

    //marketing
    if (!!this._opts.categories.marketing && !this._gdprCookie.isMarketingAccepted()) {
      for (let i in this._opts.categories.marketing) {
        Cookies.remove(this._opts.categories.marketing[i])
      }
    }
  }

  //=================================

  get categories () {
    return this._opts.categories
  }
}