import './sass/modal/_variables.scss'
import './sass/modal/_modal.scss'

export default class {
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

  // Click functions in the modal
  setModalEventListeners () {
    let closeButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-close')[0]
    let statementButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-statement')[0]
    let categoryTitles = document.querySelectorAll('.' + this._pluginPrefix + '-modal-cookie-title')
    let saveButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-save')[0]

    closeButton.addEventListener('click', (e) => {
      this.hide()
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