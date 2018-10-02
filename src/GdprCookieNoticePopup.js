import { default as hu_HU } from './locales/hu_HU.js'
import './sass/notice2/_variables.scss'
import './sass/notice2/_notice2.scss'

export default class {
  constructor (cookieManager, prefix, locale, timeout) {
  // constructor (opts) {
  //   this._isNoticeLoaded = false
  //   this._timeout = opts.timeout ? opts.timeout : 500
  //   this._pluginPrefix = opts.pluginPrefix ? opts.pluginPrefix : 'gdpr-cookie-notice'
  //   this._locale = opts.locale ? opts.locale : hu_HU['notice']
  //   this._manager = opts.cookieManager
    this._manager = cookieManager
    this._isNoticeLoaded = false
    this._timeout = timeout ? timeout : 500
    this._pluginPrefix = prefix ? prefix : 'gdpr-cookie-notice'
    this._locale = locale ? locale : hu_HU['notice']
  }

  /*
   * @param Object locale
   */
  setLocale (locale) {
    this._locale = locale
  }

  show () {
    console.log('show')
    this._build()

    // Show the notice with a little timeout
    window.setTimeout(() => {
      document.documentElement.classList.add(this._pluginPrefix + '-loaded')
    }, this._timeout)
  }

  _build () {
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

  destroy () {
    document.getElementsByClassName(this._pluginPrefix)[0].remove()
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