'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GdprCookieModal = require('./GdprCookieModal');

var _GdprCookieModal2 = _interopRequireDefault(_GdprCookieModal);

var _locales = require('./locales');

var locales = _interopRequireWildcard(_locales);

var _GdprCookieNoticePopup = require('./GdprCookieNoticePopup');

var _GdprCookieNoticePopup2 = _interopRequireDefault(_GdprCookieNoticePopup);

var _GdprCookie = require('./GdprCookie');

var _GdprCookie2 = _interopRequireDefault(_GdprCookie);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    _classCallCheck(this, _class);

    console.log('GdprCookieNotice:constructor');
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
    };
    this._isCookiesAccepted = false;
    this.load(options);
  }

  _createClass(_class, [{
    key: '_getNotice',
    value: function _getNotice() {
      return new _GdprCookieNoticePopup2.default(this, this._opts.pluginPrefix, locales[this._opts.locale]['notice'], this._opts.timeout);
    }
  }, {
    key: '_getModal',
    value: function _getModal() {
      return new _GdprCookieModal2.default(this, this._opts.pluginPrefix, locales[this._opts.locale]['modal'], this._opts.statementUrl, this._opts.isCategoriesCheckedByDefault);
    }
  }, {
    key: 'load',
    value: function load(options) {
      //remove actual
      this.destroy();

      //reset options
      this._opts = Object.assign({}, this._opts, options);

      //cookie
      this._gdprCookie = new _GdprCookie2.default(this._opts.namespace, this._opts.expiration, this._opts.domain);
      //notice
      this._notice = this._getNotice();
      //modal
      this._modal = this._getModal();

      if (!this._gdprCookie.isExists()) {
        console.log('cookie not set');
        this._notice.show();

        if (this._opts.acceptOnScroll) {
          this._acceptOnScroll();
        }
      } else {
        console.log('cookie SET');
        this._deleteUnacceptableCookies();
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

    //acceptonscroll =========

  }, {
    key: '_acceptOnScroll',
    value: function _acceptOnScroll() {
      window.addEventListener('scroll', function _listener() {
        console.log(this);
        if (this._amountScrolled()) {
          console.log('accepted on scroll');
          this.acceptAllCategories();
          window.removeEventListener('scroll', _listener);
        }
      }.bind(this));
    }
  }, {
    key: '_amountScrolled',
    value: function _amountScrolled() {
      console.log('_amountScrolled');
      var windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
      var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var trackLength = documentHeight - windowHeight;
      var pctScrolled = Math.floor(scrollTop / trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
      if (pctScrolled > 25 && !this._isCookiesAccepted) {
        this._isCookiesAccepted = true;
        return true;
      } else {
        return false;
      }
    }

    //==============

  }, {
    key: '_setModalShowButton',
    value: function _setModalShowButton() {
      var _this = this;

      var globalSettingsButtons = document.querySelectorAll('.' + this._opts.pluginPrefix + '-settings-button');

      console.log(globalSettingsButtons);

      if (globalSettingsButtons) {
        for (var i = 0; i < globalSettingsButtons.length; i++) {
          console.log('globalSettingsButtons LOOP', i, globalSettingsButtons[i]);
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
      document.dispatchEvent(new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() }));
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
      this.acceptCategories(!!this._opts.categories.performance, !!this._opts.categories.analytics, !!this._opts.categories.marketing);
    }

    //COOKIE =============================================================================================================

  }, {
    key: 'acceptCategories',
    value: function acceptCategories(isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted) {
      console.log('acceptCategories', isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);
      // Load marketing scripts that only works when cookies are accepted
      this._gdprCookie.set(true, isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);

      this._deleteUnacceptableCookies();

      this._fireCookieEnvabledEvent();

      if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
        this._notice.hide();
      } else {
        this._notice.show();
      }
    }
  }, {
    key: '_deleteUnacceptableCookies',
    value: function _deleteUnacceptableCookies() {
      if (!this._gdprCookie.isExists()) {
        return;
      }

      //analytics
      if (!!this._opts.categories.analytics && !this._gdprCookie.isAnalyticsAccepted()) {
        for (var i in this._opts.categories.analytics) {
          _jsCookie2.default.remove(this._opts.categories.analytics[i]);
        }
      }

      //performance
      if (!!this._opts.categories.performance && !this._gdprCookie.isPerformanceAccepted()) {
        for (var _i in this._opts.categories.performance) {
          _jsCookie2.default.remove(this._opts.categories.performance[_i]);
        }
      }

      //marketing
      if (!!this._opts.categories.marketing && !this._gdprCookie.isMarketingAccepted()) {
        for (var _i2 in this._opts.categories.marketing) {
          _jsCookie2.default.remove(this._opts.categories.marketing[_i2]);
        }
      }
    }

    //=================================

  }, {
    key: 'categories',
    get: function get() {
      return this._opts.categories;
    }
  }]);

  return _class;
}();

exports.default = _class;
//# sourceMappingURL=GdprCookieNoticeManager.js.map