import { default as template } from './template'
import * as locales from './locales'
import Cookies from 'js-cookie'
import './sass/gdpr-cookie-notice.scss'

class GdprCookie {
  constructor (name, expiration, domain) {
    this._name = name
    this._expiration = expiration
    this._domain = domain
  }

  isExists () {
    return !!Cookies.getJSON(this._name)
  }

  set (isNecessaryAccepted, isAnalyticsAccepted, isPerformanceAccepted, isMarketingAccepted) {
    let value = {
      date: new Date(),
      necessary: isNecessaryAccepted,
      performance: isPerformanceAccepted,
      analytics: isAnalyticsAccepted,
      marketing: isMarketingAccepted
    }

    Cookies.set(this._name, value, {expires: this._expiration, domain: this._domain})
  }

  get () {
    return Cookies.getJSON(this._name)
  }

  // delete () {
  //
  // }
}

class GdprCookieNotice {
  constructor (options) {
    this._categories = options.categories ? options.categories : []
    this._locale = options.locale ? options.locale : 'hu'
    this._timeout = options.timeout ? options.timeout : 500
    this._domain = options.domain ? options.domain : window.location.hostname
    this._expiration = options.expiration ? options.expiration : 30
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice'
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice'
    this._implicit = options.implicit ? options.implicit : false
    this._cookiesAccepted = false
    this._statementUrl = options.statementUrl ? options.statementUrl : '';
    this._gdprCookie = new GdprCookie(this._namespace, this._expiration, this._domain)

    if (!this._gdprCookie.isExists()) {
      this.showNotice()

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    } else {
      //   this.deleteCookies(this.getCurrentCookieSelection())
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', {detail: this._gdprCookie.get()})
      document.dispatchEvent(this._gdprCookiesEnabledEvt)
    }
  }

  //NOTICE =============================================================================================================

  showNotice () {
    this.buildNotice()

    // Show the notice with a little timeout
    window.setTimeout(() => {
      document.documentElement.classList.add(this._pluginPrefix + '-loaded')
    }, this._timeout)
  }

  buildNotice () {
    console.log(this.getTemplateHtml('bar', locales[this._locale]))
    document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml('bar', locales[this._locale]))
    let settingsButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-settings')[0]
    let acceptButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-accept')[0]

    settingsButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.showModal()
    })

    acceptButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.acceptCategories()
    })
  }

  hideNotice () {
    document.documentElement.classList.remove(this._pluginPrefix + '-loaded')
  }

  //MODAL ==============================================================================================================

  buildModal () {
    // if (modalLoaded) {
    //   return false
    // }

    // Load modal template
    let modalHtml = this.getTemplateHtml('modal', [])

    // Append modal into body
    document.body.insertAdjacentHTML('beforeend', modalHtml)

    // Get empty category list
    let categoryList = document.querySelector('.' + this._pluginPrefix + '-modal-cookies')

    //Load essential cookies
    categoryList.innerHTML += this.getTemplateHtml('category', []/*'cookie_essential'*/)
    let input = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input')
    let label = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input-switch')
    label.innerHTML = locales[this._locale]['always_on']
    label.classList.add(this._pluginPrefix + '-modal-cookie-state')
    label.classList.remove(this._pluginPrefix + '-modal-cookie-input-switch')
    input.remove()

    for (let catId in this._categories) {
      categoryList.innerHTML += this.getTemplateHtml('category',
        {
          prefix: 'cookie_' + catId,
          checked: this._isCategoriesCheckedByDefault || this._gdprCookie.get()[catId] ? 'checked="checked"' : ''
        }
      )
    }

    // Load click functions
    this.setModalEventListeners()

    // Make sure modal is only loaded once
    // modalLoaded = true
  }

  showModal () {
    this.buildModal()
    document.documentElement.classList.add(this._pluginPrefix + '-show-modal')
  }

  hideModal () {
    document.documentElement.classList.remove(this._pluginPrefix + '-show-modal')
  }

  // Click functions in the modal
  setModalEventListeners () {
    let closeButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-close')[0]
    let statementButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-statement')[0]
    let categoryTitles = document.querySelectorAll('.' + this._pluginPrefix + '-modal-cookie-title')
    let saveButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-save')[0]

    closeButton.addEventListener('click', (e) => {
      this.hideModal()
      return false
    })

    statementButton.addEventListener('click', (e) => {
      e.preventDefault()
      window.open(
        config.statement,
        '_blank'
      )
      //window.location.href = config.statement;
    })

    for (var i = 0; i < categoryTitles.length; i++) {
      categoryTitles[i].addEventListener('click', function () {
        this.parentNode.parentNode.classList.toggle('open')
        return false
      })
    }

    saveButton.addEventListener('click', function (e) {
      e.preventDefault()
      saveButton.classList.add('saved')
      setTimeout(function () {
        saveButton.classList.remove('saved')
      }, 1000)
      acceptCookies(true)
      setTimeout(function () {
        hideModal()
      }, 1000)
    })

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

  acceptCategories () {
    // let value = {
    //   date: new Date(),
    //   necessary: true,
    // }

    // If request was coming from the modal, check for the settings
    // if (save) {
    //   for (var i = 0; i < categories.length; i++) {
    //     value[categories[i]] = document.getElementById(pluginPrefix + '-cookie_' + categories[i]).checked
    //   }
    // }

    // Cookies.set(this._namespace, value, {expires: this._expiration, domain: this._domain})
    // this.deleteCookies(value)

    // Load marketing scripts that only works when cookies are accepted
    this._gdprCookie.set(
      true,
      !!this._categories.performance,
      !!this._categories.analytics,
      !!this._categories.marketing
    )
    this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', {detail: this._gdprCookie.get()})
    document.dispatchEvent(this._gdprCookiesEnabledEvt)
  }

  // getCurrentCookieSelection () {
  //   return Cookies.getJSON(this._namespace)
  // }

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

  //GETTER - SETTER ====================================================================================================

  set statementUrl (statementUrl) {
    this._statementUrl = statementUrl
  }

  get statementUrl () {
    return this._statementUrl
  }

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