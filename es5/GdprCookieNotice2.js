'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(gdprCookieManager) {
    _classCallCheck(this, _class);

    this._isNoticeLoaded = false;
    this._timeout = 500;
    this._pluginPrefix = 'gdpr-cookie-notice';
    this._locale = {
      description: 'Ez a weboldal s\xFCtiket(cookie-kat) haszn\xE1l az\xE9rt, hogy a weboldal m\u0171k\xF6dj\xF6n, statisztikai adatokat \n      gy\u0171jts\xF6n \xE9s jobb felhaszn\xE1li\xF3 \xE9lm\xE9nyt ny\xFAjtson. A S\xFCti be\xE1ll\xEDt\xE1sok gombra kattintva t\xF6bb inform\xE1ci\xF3t is megtudhat \n      err\u0151l. Az oldal tov\xE1bbi haszn\xE1lat\xE1val beleegyezik a s\xFCtik haszn\xE1lat\xE1ba.',
      accept: 'Elfogadom',
      settings: 'Süti beállítások'
    };
    this._manager = gdprCookieManager;
  }

  /*
   * @param Object locale
   */


  _createClass(_class, [{
    key: 'setLocale',
    value: function setLocale(locale) {
      this._locale = locale;
    }
  }, {
    key: 'show',
    value: function show() {
      var _this = this;

      console.log('show');
      this.build();

      // Show the notice with a little timeout
      window.setTimeout(function () {
        document.documentElement.classList.add(_this._pluginPrefix + '-loaded');
      }, this._timeout);
    }
  }, {
    key: 'build',
    value: function build() {
      var _this2 = this;

      if (this._isNoticeLoaded) {
        return;
      }
      document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml(this._getTemplate(), this._locale));
      var settingsButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-settings')[0];
      var acceptButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-accept')[0];

      settingsButton.addEventListener('click', function (e) {
        e.preventDefault();
        _this2._manager.setEvent('show_modal');
      });

      acceptButton.addEventListener('click', function (e) {
        e.preventDefault();
        _this2._manager.setEvent('accept_all_category');
      });

      this._isNoticeLoaded = true;
    }
  }, {
    key: 'hide',
    value: function hide() {
      document.documentElement.classList.remove(this._pluginPrefix + '-loaded');
    }
  }, {
    key: '_getTemplate',
    value: function _getTemplate() {
      return '<div class="gdpr-cookie-notice">\n    <p class="gdpr-cookie-notice-description">{{description}}</p>\n    <nav class="gdpr-cookie-notice-nav">\n      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{{settings}}</a>\n      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{{accept}}</a>\n    </nav>\n    </div>';
    }

    //string, object

  }, {
    key: 'getTemplateHtml',
    value: function getTemplateHtml(template, data) {
      if (typeof template === 'string' && data instanceof Object) {
        return template.replace(/{{([^}]+)}}/g, function (i, j) {
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
  }]);

  return _class;
}();

exports.default = _class;
//# sourceMappingURL=GdprCookieNotice2.js.map