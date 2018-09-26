export default class {
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
    console.log('show')
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