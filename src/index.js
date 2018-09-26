import { default as template } from './template'
import * as locales from './locales'
import './sass/gdpr-cookie-notice.scss'
import GdprCookie from './GdprCookie'

// GdprCookieNotice2 ==================================

class GdprCookieNotice2 {
  constructor (gdprCookieManager) {
    this._isNoticeLoaded = false
    this._timeout = 500
    this._pluginPrefix = 'gdpr-cookie-notice'
    this._locale = {
      description: `Ez a weboldal sütiket(cookie-kat) használ azért, hogy a weboldal működjön, statisztikai adatokat 
      gyűjtsön és jobb felhasználió élményt nyújtson. A Süti beállítások gombra kattintva több információt is megtudhat 
      erről. Az oldal további használatával beleegyezik a sütik használatába.`,
      accept: 'Elfogadom',
      settings: 'Süti beállítások'
    }
    this._manager = gdprCookieManager
  }

  /*
   * @param Object locale
   */
  setLocale (locale) {
    this._locale = locale
  }

  show () {
    this.build()

    // Show the notice with a little timeout
    window.setTimeout(() => {
      document.documentElement.classList.add(this._pluginPrefix + '-loaded')
    }, this._timeout)
  }

  build () {
    if (this._isNoticeLoaded) { return }
    document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml(this._getTemplate(), this._locale))
    let settingsButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-settings')[0]
    let acceptButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-accept')[0]

    settingsButton.addEventListener('click', (e) => {
      e.preventDefault()
      this._manager.setEvent('show_modal')
    })

    acceptButton.addEventListener('click', (e) => {
      e.preventDefault()
      this._manager.setEvent('accept_all_category')
    })

    this._isNoticeLoaded = true
  }

  hide () {
    document.documentElement.classList.remove(this._pluginPrefix + '-loaded')
  }

  _getTemplate () {
    return `<div class="gdpr-cookie-notice">
    <p class="gdpr-cookie-notice-description">{{description}}</p>
    <nav class="gdpr-cookie-notice-nav">
      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{{settings}}</a>
      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{{accept}}</a>
    </nav>
    </div>`
  }

  //string, object
  getTemplateHtml (template, data) {
    if (typeof template === 'string' && (data instanceof Object)) {
      return template.replace(/{{([^}]+)}}/g, function (i, j) {
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
}

// GdprCookieModal ======================================================

class GdprCookieModal {
  constructor (gdprCookieManager) {
    this._manager = gdprCookieManager
    this._locale = {
      modal: {
        settings: 'Süti beállítások',
        statement: 'Süti nyilatkozatunk',
        save: 'Mentés'
      },
      category: {
        essential: {
          title: 'Szükséges sütik',
          desc: 'Ezek a weboldal megfelelő megjelenéséhez szükséges sütik, amelyek nélkül nem működne a weboldal.',
          always_on: 'Mindig betölt'
        },
        performance: {
          title: 'Teljesítmény sütik',
          desc: `Ezek a sütik kiegészítő funkciókat támogatnak az oldalon, például eltárolja, hogy milyen nyelven böngészi 
          a weboldalt. Ezek nélkül nem biztos, hogy minden megfelelően fog működni.`
        },
        analytics: {
          title: 'Statisztika sütik',
          desc: `Ezeket azért használjuk, hogy tájékozódni tudjunk arról, mikor, hányan és hogyan használják a 
          weboldalunkat. Ezekkel az adatokkal tudjuk később optimalizálni a weboldalunkat a megfelelő felhasználói 
          élményért.`
        },
        marketing: {
          title: 'Marketing sütik',
          desc: 'Ezek a sütik segítenek nekünk a hirdetések kezelésében, célzásában.'
        }
      }
    }
    this._pluginPrefix = 'gdpr-cookie-notice'
    this._isModalLoaded = false
    this._isCategoriesCheckedByDefault = false
    this._statementUrl = 'https://index.hu/'
  }

  buildModal () {
    if (this._isModalLoaded) {
      return
    }

    // Append modal into body
    document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml(this._getModalTemplate(), this._locale.modal))

    // Get empty category list
    let categoryList = document.querySelector('.' + this._pluginPrefix + '-modal-cookies')

    //Load essential cookies
    categoryList.innerHTML += this.getTemplateHtml(
      this._getCategoryTemplate(),
      Object.assign(
        {},
        this._locale.category.essential,
        {
          prefix: 'cookie_essential',
          checked: 'checked="checked"'
        }
      )
    )
    let input = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input')
    let label = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input-switch')
    label.innerHTML = this._locale.essential.always_on
    label.classList.add(this._pluginPrefix + '-modal-cookie-state')
    label.classList.remove(this._pluginPrefix + '-modal-cookie-input-switch')
    input.remove()

    for (let catId in this._manager.categories()) {
      categoryList.innerHTML += this.getTemplateHtml(
        this._getCategoryTemplate(),
        Object.assign(
          {},
          this._locale.category[catId],
          {
            prefix: 'cookie_' + catId,
            // checked: this._isCategoriesCheckedByDefault || (this._gdprCookie.isExists() && this._gdprCookie.get()[catId])
            checked: true
              ? 'checked="checked"'
              : ''
          }
        )
      )
    }

    // Load click functions
    this.setModalEventListeners()

    // Make sure modal is only loaded once
    this._isModalLoaded = true
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
        this._statementUrl,
        '_blank'
      )
    })

    for (let i = 0; i < categoryTitles.length; i++) {
      categoryTitles[i].addEventListener('click', (e) => {
        e.currentTarget.parentNode.parentNode.classList.toggle('open')
        return false
      })
    }

    saveButton.addEventListener('click', (e) => {
      e.preventDefault()
      saveButton.classList.add('saved')
      window.setTimeout(() => {
        saveButton.classList.remove('saved')
      }, 1000)

      let categorySettings = {}

      for (let catId in this._manager.categories) {
        categorySettings[catId] = document.getElementById(this._pluginPrefix + '-cookie_' + catId).checked
      }

      this._manager.setEvent(
        'accept_categories',
        {
          performance: !!this._manager.categories.performance && document.getElementById(this._pluginPrefix + '-cookie_performance').checked,
          analytics: !!this._manager.categories.analytics && document.getElementById(this._pluginPrefix + '-cookie_analytics').checked,
          marketing: !!this._manager.categories.marketing && document.getElementById(this._pluginPrefix + '-cookie_marketing').checked
        }
      )
      window.setTimeout(() => {
        this.hideModal()
      }, 1000)
    })
  }

  _getModalTemplate () {
    return `<div class="gdpr-cookie-notice">
    <p class="gdpr-cookie-notice-description">{{description}}</p>
    <nav class="gdpr-cookie-notice-nav">
      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{{settings}}</a>
      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{{accept}}</a>
    </nav>
    </div>`
  }

  _getCategoryTemplate () {
    return `<li class="gdpr-cookie-notice-modal-cookie">
    <div class="gdpr-cookie-notice-modal-cookie-row">
      <h3 class="gdpr-cookie-notice-modal-cookie-title">{{title}}</h3>
      <input type="checkbox" name="gdpr-cookie-notice-{{prefix}}" id="gdpr-cookie-notice-{{prefix}}" class="gdpr-cookie-notice-modal-cookie-input" {{checked}}>
      <label class="gdpr-cookie-notice-modal-cookie-input-switch" for="gdpr-cookie-notice-{{prefix}}"></label>
    </div>
    <p class="gdpr-cookie-notice-modal-cookie-info">{{desc}}</p>
    </li>`
  }

  //string, object
  getTemplateHtml (template, data) {
    if (typeof template === 'string' && (data instanceof Object)) {
      return template.replace(/{{([^}]+)}}/g, function (i, j) {
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
}

// GdprCookieNotice =======================================================

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
    this._statementUrl = options.statementUrl ? options.statementUrl : ''
    this._gdprCookie = new GdprCookie(this._namespace, this._expiration, this._domain)
    this._isNoticeLoaded = false
    this._isModalLoaded = false
    //
    this._notice = new GdprCookieNotice2(this)
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
          this.showModal()
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
    console.log('categorySettings', isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted)
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