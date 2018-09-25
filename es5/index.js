'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _locales = require('./locales');

var locales = _interopRequireWildcard(_locales);

require('./sass/gdpr-cookie-notice.scss');

var _GdprCookie = require('./GdprCookie');

var _GdprCookie2 = _interopRequireDefault(_GdprCookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GdprCookieNotice = function () {
  function GdprCookieNotice(options) {
    var _this = this;

    _classCallCheck(this, GdprCookieNotice);

    this._categories = options.categories ? options.categories : [];
    this._locale = options.locale ? options.locale : 'hu';
    this._timeout = options.timeout ? options.timeout : 500;
    this._domain = options.domain ? options.domain : window.location.hostname;
    this._expiration = options.expiration ? options.expiration : 30;
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false;
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice';
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice';
    this._implicit = options.implicit ? options.implicit : false;
    this._cookiesAccepted = false;
    this._statementUrl = options.statementUrl ? options.statementUrl : '';
    this._gdprCookie = new _GdprCookie2.default(this._namespace, this._expiration, this._domain);

    if (!this._gdprCookie.isExists()) {
      this.showNotice();

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    } else {
      //   this.deleteCookies(this.getCurrentCookieSelection())
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() });
      document.dispatchEvent(this._gdprCookiesEnabledEvt);
    }

    // Settings button on the page somewhere
    var globalSettingsButton = document.querySelectorAll('.' + this._pluginPrefix + '-settings-button');
    if (globalSettingsButton) {
      for (var i in globalSettingsButton) {
        globalSettingsButton[i].addEventListener('click', function (e) {
          e.preventDefault();
          _this.showModal();
        });
      }
    }
  }

  //NOTICE =============================================================================================================

  _createClass(GdprCookieNotice, [{
    key: 'showNotice',
    value: function showNotice() {
      var _this2 = this;

      this.buildNotice();

      // Show the notice with a little timeout
      window.setTimeout(function () {
        document.documentElement.classList.add(_this2._pluginPrefix + '-loaded');
      }, this._timeout);
    }
  }, {
    key: 'buildNotice',
    value: function buildNotice() {
      var _this3 = this;

      console.log(this.getTemplateHtml('bar', locales[this._locale]['bar']));
      document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml('bar', locales[this._locale]['bar']));
      var settingsButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-settings')[0];
      var acceptButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-accept')[0];

      settingsButton.addEventListener('click', function (e) {
        e.preventDefault();
        _this3.showModal();
      });

      acceptButton.addEventListener('click', function (e) {
        e.preventDefault();

        _this3.acceptCategories(!!_this3._categories.performance, !!_this3._categories.analytics, !!_this3._categories.marketing);
      });
    }
  }, {
    key: 'hideNotice',
    value: function hideNotice() {
      document.documentElement.classList.remove(this._pluginPrefix + '-loaded');
    }

    //MODAL ==============================================================================================================

  }, {
    key: 'buildModal',
    value: function buildModal() {
      // if (modalLoaded) {
      //   return false
      // }

      // Load modal template
      var modalHtml = this.getTemplateHtml('modal', Object.assign({}, locales[this._locale]['modal']));

      // Append modal into body
      document.body.insertAdjacentHTML('beforeend', modalHtml);

      // Get empty category list
      var categoryList = document.querySelector('.' + this._pluginPrefix + '-modal-cookies');

      //Load essential cookies
      categoryList.innerHTML += this.getTemplateHtml('category', Object.assign({}, locales[this._locale]['category']['essential'], {
        prefix: 'cookie_essential',
        checked: 'checked="checked"'
      }));
      var input = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input');
      var label = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input-switch');
      label.innerHTML = locales[this._locale]['category']['essential']['always_on'];
      label.classList.add(this._pluginPrefix + '-modal-cookie-state');
      label.classList.remove(this._pluginPrefix + '-modal-cookie-input-switch');
      input.remove();

      for (var catId in this._categories) {
        categoryList.innerHTML += this.getTemplateHtml('category', Object.assign({}, locales[this._locale]['category'][catId], {
          prefix: 'cookie_' + catId,
          checked: this._isCategoriesCheckedByDefault || this._gdprCookie.isExists() && this._gdprCookie.get()[catId] ? 'checked="checked"' : ''
        }));
      }

      // Load click functions
      this.setModalEventListeners();

      // Make sure modal is only loaded once
      // modalLoaded = true
    }
  }, {
    key: 'showModal',
    value: function showModal() {
      this.buildModal();
      document.documentElement.classList.add(this._pluginPrefix + '-show-modal');
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      document.documentElement.classList.remove(this._pluginPrefix + '-show-modal');
    }

    // Click functions in the modal

  }, {
    key: 'setModalEventListeners',
    value: function setModalEventListeners() {
      var _this4 = this;

      var closeButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-close')[0];
      var statementButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-statement')[0];
      var categoryTitles = document.querySelectorAll('.' + this._pluginPrefix + '-modal-cookie-title');
      var saveButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-save')[0];

      closeButton.addEventListener('click', function (e) {
        _this4.hideModal();
        return false;
      });

      statementButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.open(_this4._statementUrl, '_blank');
      });

      for (var i = 0; i < categoryTitles.length; i++) {
        categoryTitles[i].addEventListener('click', function (e) {
          e.currentTarget.parentNode.parentNode.classList.toggle('open');
          return false;
        });
      }

      saveButton.addEventListener('click', function (e) {
        e.preventDefault();
        saveButton.classList.add('saved');
        window.setTimeout(function () {
          saveButton.classList.remove('saved');
        }, 1000);

        var categorySettings = {};

        for (var catId in _this4._categories) {
          categorySettings[catId] = document.getElementById(_this4._pluginPrefix + '-cookie_' + catId).checked;
        }

        _this4.acceptCategories(!!_this4._categories.performance && document.getElementById(_this4._pluginPrefix + '-cookie_performance').checked, !!_this4._categories.analytics && document.getElementById(_this4._pluginPrefix + '-cookie_analytics').checked, !!_this4._categories.marketing && document.getElementById(_this4._pluginPrefix + '-cookie_marketing').checked);
        window.setTimeout(function () {
          _this4.hideModal();
        }, 1000);
      });
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

  }, {
    key: 'acceptCategories',
    value: function acceptCategories(isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted) {
      console.log('categorySettings', isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);

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
      this._gdprCookie.set(true, isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() });
      document.dispatchEvent(this._gdprCookiesEnabledEvt);

      if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
        this.hideNotice();
      } else {
        this.showNotice();
      }
    }

    // getCurrentCookieSelection () {
    //   return Cookies.getJSON(this._namespace)
    // }

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

    //GETTER - SETTER ====================================================================================================

  }, {
    key: 'statementUrl',
    set: function set(statementUrl) {
      this._statementUrl = statementUrl;
    },
    get: function get() {
      return this._statementUrl;
    }
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