import { default as hu_HU } from './locales/hu_HU.js'
import './sass/modal/_variables.scss'
import './sass/modal/_modal.scss'

export default class {
  constructor (cookieManager, prefix, locale, statementUrl, isCheckedByDefault) {
    this._manager = cookieManager
    this._locale = locale ? locale : hu_HU['modal']
    this._pluginPrefix = prefix ? prefix : 'gdpr-cookie-notice'
    this._isCategoriesCheckedByDefault = isCheckedByDefault ? isCheckedByDefault : false
    this._statementUrl = statementUrl ? statementUrl : ''
    this._isModalLoaded = false
  }

  build () {
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
    label.innerHTML = this._locale.category.essential.always_on
    label.classList.add(this._pluginPrefix + '-modal-cookie-state')
    label.classList.remove(this._pluginPrefix + '-modal-cookie-input-switch')
    input.remove()

    for (let catId in this._manager.categories) {
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

  show () {
    this.build()
    document.documentElement.classList.add(this._pluginPrefix + '-show-modal')
  }

  hide () {
    document.documentElement.classList.remove(this._pluginPrefix + '-show-modal')
  }

  destroy () {
    if (this._isModalLoaded) {
      document.getElementsByClassName(this._pluginPrefix + '-modal')[0].remove()
    }
  }

  // Click functions in the modal
  setModalEventListeners () {
    let closeButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-close')[0]
    let statementButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-statement')[0]
    let categoryTitles = document.querySelectorAll('.' + this._pluginPrefix + '-modal-cookie-title')
    let saveButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-save')[0]

    closeButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.hide()
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
        this.hide()
      }, 1000)
    })
  }

  _getModalTemplate () {
    return `<div class="gdpr-cookie-notice-modal">
      <div class="gdpr-cookie-notice-modal-content">
        <div class="gdpr-cookie-notice-modal-header">
          <h2 class="gdpr-cookie-notice-modal-title">{{settings}}</h2>
          <button type="button" class="gdpr-cookie-notice-modal-close"></button>
        </div>
        <ul class="gdpr-cookie-notice-modal-cookies"></ul>
        <div class="gdpr-cookie-notice-modal-footer">
          <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement">{{statement}}</a>
          <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn">
              <span>{{save}}</span>
          </a>
        </div>
      </div>
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