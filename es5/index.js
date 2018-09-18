'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _locales = require('./locales');

var locales = _interopRequireWildcard(_locales);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

require('./sass/gdpr-cookie-notice.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GdprCookieNotice = function () {
  function GdprCookieNotice(options) {
    _classCallCheck(this, GdprCookieNotice);

    this._categories = [];
    this._categorySettings = [];
    this._locale = options.locale ? options.locale : 'hu';
    this._timeout = options.timeout ? options.timeout : 500;
    this._domain = options.domain ? options.domain : window.location.hostname;
    this._expiration = options.expiration ? options.expiration : 30;
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false;
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice';
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice';
    this._implicit = options.implicit ? options.implicit : false;
    this._cookiesAccepted = false;

    if (options.performance && options.performance.length) {
      this._categorySettings.performance = options.performance;
      this._categories.push('performance');
    }

    if (options.analytics && options.analytics.length) {
      this._categorySettings.analytics = options.analytics;
      this._categories.push('analytics');
    }

    if (options.marketing && options.marketing.length) {
      this._categorySettings.marketing = options.marketing;
      this._categories.push('marketing');
    }

    // console.log('gdprCookieNotice', locales, locales.hu, template)
    // console.log(this.getCurrentCookieSelection())

    this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this.getCurrentCookieSelection() });

    if (!this.getCurrentCookieSelection()) {
      this.showNotice();

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    }
    // else {
    //   this.deleteCookies(this.getCurrentCookieSelection())
    //   document.dispatchEvent(this._gdprCookiesEnabledEvt)
    // }
  }

  _createClass(GdprCookieNotice, [{
    key: 'showNotice',
    value: function showNotice() {
      this.buildNotice();

      // Show the notice with a little timeout
      window.setTimeout(function () {
        document.documentElement.classList.add(this._pluginPrefix + '-loaded');
      }, this._timeout);
    }
  }, {
    key: 'buildNotice',
    value: function buildNotice() {
      console.log(this.getTemplateHtml('bar', locales[this._locale]));
      document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml('bar', locales[this._locale]));
      var settingsButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-settings')[0];
      var acceptButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-accept')[0];

      settingsButton.addEventListener('click', function (e) {
        e.preventDefault();
        // showModal()
      });

      acceptButton.addEventListener('click', function (e) {
        e.preventDefault();
        // acceptCookies()
      });
    }
  }, {
    key: 'getTemplateHtml',
    value: function getTemplateHtml(templateKey, data) {
      var templateStr = _template2.default[templateKey];

      // console.log('templateStr', templateStr, data)

      if (typeof templateStr === 'string' && data instanceof Object) {
        return templateStr.replace(/{{([^}]+)}}/g, function (i, j) {
          if (data[j]) {
            return data[j];
          } else {
            return i;
          }
        });
      } else {
        return false;
      }
    }
  }, {
    key: 'getCurrentCookieSelection',
    value: function getCurrentCookieSelection() {
      return _jsCookie2.default.getJSON(this._namespace);
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

  }, {
    key: 'implicit',
    set: function set(isImplicit) {
      this._implicit = isImplicit;
    },
    get: function get() {
      return this._implicit;
    }
  }, {
    key: 'cookiesAccepted',
    set: function set(isAccepted) {
      this._cookiesAccepted = isAccepted;
    },
    get: function get() {
      return this._cookiesAccepted;
    }
  }, {
    key: 'categories',
    set: function set(categories) {
      this._categories = categories;
    },
    get: function get() {
      return this._categories;
    }
  }, {
    key: 'locale',
    set: function set(locale) {
      this._locale = locale;
    },
    get: function get() {
      return this._locale;
    }
  }, {
    key: 'timeout',
    set: function set(timeout) {
      this._timeout = timeout;
    },
    get: function get() {
      return this._timeout;
    }
  }, {
    key: 'domain',
    set: function set(domain) {
      this._domain = domain;
    },
    get: function get() {
      return this._domain;
    }
  }, {
    key: 'expiration',
    set: function set(expiration) {
      this._expiration = expiration;
    },
    get: function get() {
      return this._expiration;
    }
  }, {
    key: 'isCategoriesCheckedByDefault',
    set: function set(isCategoriesCheckedByDefault) {
      this._isCategoriesCheckedByDefault = isCategoriesCheckedByDefault;
    },
    get: function get() {
      return this._isCategoriesCheckedByDefault;
    }
  }, {
    key: 'namespace',
    set: function set(namespace) {
      this._namespace = namespace;
    },
    get: function get() {
      return this._namespace;
    }
  }, {
    key: 'pluginPrefix',
    set: function set(pluginPrefix) {
      this._pluginPrefix = pluginPrefix;
    },
    get: function get() {
      return this._pluginPrefix;
    }
  }]);

  return GdprCookieNotice;
}();

// export default { gdprCookieNotice }


exports.default = { GdprCookieNotice: GdprCookieNotice };
//# sourceMappingURL=index.js.map