'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import './sass/gdpr-cookie-notice.scss'
// import "sass/modal/_variables.scss";
// import "sass/notice2/_variables.scss";

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _locales = require('./locales');

var locales = _interopRequireWildcard(_locales);

var _GdprCookie = require('./GdprCookie');

var _GdprCookie2 = _interopRequireDefault(_GdprCookie);

var _GdprCookieNoticePopup = require('./GdprCookieNoticePopup');

var _GdprCookieNoticePopup2 = _interopRequireDefault(_GdprCookieNoticePopup);

var _GdprCookieModal = require('./GdprCookieModal');

var _GdprCookieModal2 = _interopRequireDefault(_GdprCookieModal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// GdprCookieNotice =======================================================

var GdprCookieNotice = function () {
  function GdprCookieNotice(options) {
    _classCallCheck(this, GdprCookieNotice);

    console.log('GdprCookieNotice:constructor');
    this._categories = options.categories ? options.categories : [];
    // this._implicit = options.implicit ? options.implicit : false
    // this._cookiesAccepted = false
    //COOKIE
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice';
    this._expiration = options.expiration ? options.expiration : 30;
    this._domain = options.domain ? options.domain : window.location.hostname;

    //BOXES ==============
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice';
    this._locale = options.locale ? options.locale : 'hu';
    //NOTICE
    this._timeout = options.timeout ? options.timeout : 500;
    this._statementUrl = options.statementUrl ? options.statementUrl : '';
    //MODAL
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false;
  }

  _createClass(GdprCookieNotice, [{
    key: 'run',
    value: function run() {
      this.destroy();
      //cookie
      this._gdprCookie = new _GdprCookie2.default(this._namespace, this._expiration, this._domain);
      //notice
      this._notice = new _GdprCookieNoticePopup2.default(this, this._pluginPrefix, locales[this._locale]['notice'], this._timeout, this._statementUrl);
      //modal
      this._modal = new _GdprCookieModal2.default(this, this._pluginPrefix, locales[this._locale]['modal'], this._isCategoriesCheckedByDefault);

      if (!this._gdprCookie.isExists()) {
        this._notice.show();

        // if (this._implicit) {
        //   this.acceptOnScroll()
        // }
      } else {
        //   this.deleteCookies(this.getCurrentCookieSelection())
        this._fireCookieEnvabledEvent();
      }

      this._setModalShowButton();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._notice) {
        this._notice.destroy();
      }

      if (this._modal) {
        this._modal.destroy();
      }
    }
  }, {
    key: '_setModalShowButton',
    value: function _setModalShowButton() {
      var _this = this;

      var globalSettingsButtons = document.querySelectorAll('.' + this._pluginPrefix + '-settings-button');

      if (globalSettingsButtons) {
        for (var i in globalSettingsButtons) {
          console.log(i, globalSettingsButtons[i]);
          globalSettingsButtons[i].addEventListener('click', function (e) {
            e.preventDefault();
            _this._modal.show();
          });
        }
      }
    }
  }, {
    key: '_fireCookieEnvabledEvent',
    value: function _fireCookieEnvabledEvent() {
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() });
      document.dispatchEvent(this._gdprCookiesEnabledEvt);
    }
  }, {
    key: 'setEvent',
    value: function setEvent(evt, data) {
      switch (evt) {
        case 'accept_all_category':
          this.acceptAllCategories();
          break;

        case 'accept_categories':
          this.acceptCategories(data.performance, data.analytics, data.marketing);
          break;

        case 'show_modal':
          this._modal.show();
          break;

        default:
          throw new Error('Event type not supported');
      }
    }
  }, {
    key: 'acceptAllCategories',
    value: function acceptAllCategories() {
      this.acceptCategories(!!this._categories.performance, !!this._categories.analytics, !!this._categories.marketing);
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
      console.log('acceptCategories', isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);
      // Load marketing scripts that only works when cookies are accepted
      this._gdprCookie.set(true, isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);
      this._fireCookieEnvabledEvent();

      if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
        this._notice.hide();
      } else {
        this._notice.show();
      }
    }

    //GETTER - SETTER ====================================================================================================

  }, {
    key: 'notice',
    get: function get() {
      return this._notice;
    },
    set: function set(notice) {
      this._notice = notice;
    }
  }, {
    key: 'modal',
    get: function get() {
      return this._modal;
    },
    set: function set(modal) {
      this._modal = modal;
    }
  }, {
    key: 'statementUrl',
    set: function set(statementUrl) {
      this._statementUrl = statementUrl;
    },
    get: function get() {
      return this._statementUrl;
    }

    // set implicit (isImplicit) {
    //   this._implicit = isImplicit
    // }
    //
    // get implicit () {
    //   return this._implicit
    // }

    // set cookiesAccepted (isAccepted) {
    //   this._cookiesAccepted = isAccepted
    // }
    //
    // get cookiesAccepted () {
    //   return this._cookiesAccepted
    // }

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

exports.default = { GdprCookieNotice: GdprCookieNotice };
//# sourceMappingURL=index.js.map