'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _en_GB = require('./locales/en_GB.js');

var _en_GB2 = _interopRequireDefault(_en_GB);

require('./sass/modal/_variables.scss');

require('./sass/modal/_modal.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(cookieManager, prefix, locale, statementUrl, isCheckedByDefault) {
    _classCallCheck(this, _class);

    this._manager = cookieManager;
    this._locale = locale ? locale : _en_GB2.default['modal'];
    this._pluginPrefix = prefix ? prefix : 'gdpr-cookie-notice';
    this._isCategoriesCheckedByDefault = isCheckedByDefault ? isCheckedByDefault : false;
    this._statementUrl = statementUrl ? statementUrl : '';
    this._isModalLoaded = false;
  }

  _createClass(_class, [{
    key: 'build',
    value: function build() {
      if (this._isModalLoaded) {
        return;
      }

      // Append modal into body
      document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml(this._getModalTemplate(), this._locale.modal));

      // Get empty category list
      var categoryList = document.querySelector('.' + this._pluginPrefix + '-modal-cookies');

      //Load essential cookies
      categoryList.innerHTML += this.getTemplateHtml(this._getCategoryTemplate(), Object.assign({}, this._locale.category.essential, {
        prefix: 'cookie_essential',
        checked: 'checked="checked"'
      }));
      var input = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input');
      var label = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input-switch');
      label.innerHTML = this._locale.category.essential.always_on;
      label.classList.add(this._pluginPrefix + '-modal-cookie-state');
      label.classList.remove(this._pluginPrefix + '-modal-cookie-input-switch');
      input.remove();

      for (var catId in this._manager.categories) {
        categoryList.innerHTML += this.getTemplateHtml(this._getCategoryTemplate(), Object.assign({}, this._locale.category[catId], {
          prefix: 'cookie_' + catId,
          // checked: this._isCategoriesCheckedByDefault || (this._gdprCookie.isExists() && this._gdprCookie.get()[catId])
          checked: true ? 'checked="checked"' : ''
        }));
      }

      // Load click functions
      this.setModalEventListeners();

      // Make sure modal is only loaded once
      this._isModalLoaded = true;
    }
  }, {
    key: 'show',
    value: function show() {
      this.build();
      document.documentElement.classList.add(this._pluginPrefix + '-show-modal');
    }
  }, {
    key: 'hide',
    value: function hide() {
      document.documentElement.classList.remove(this._pluginPrefix + '-show-modal');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._isModalLoaded) {
        document.getElementsByClassName(this._pluginPrefix + '-modal')[0].remove();
      }
    }

    // Click functions in the modal

  }, {
    key: 'setModalEventListeners',
    value: function setModalEventListeners() {
      var _this = this;

      var closeButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-close')[0];
      var statementButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-statement')[0];
      var categoryTitles = document.querySelectorAll('.' + this._pluginPrefix + '-modal-cookie-title');
      var saveButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-save')[0];

      closeButton.addEventListener('click', function (e) {
        e.preventDefault();
        _this.hide();
      });

      statementButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.open(_this._statementUrl, '_blank');
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

        for (var catId in _this._manager.categories) {
          categorySettings[catId] = document.getElementById(_this._pluginPrefix + '-cookie_' + catId).checked;
        }

        _this._manager.setEvent('accept_categories', {
          performance: !!_this._manager.categories.performance && document.getElementById(_this._pluginPrefix + '-cookie_performance').checked,
          analytics: !!_this._manager.categories.analytics && document.getElementById(_this._pluginPrefix + '-cookie_analytics').checked,
          marketing: !!_this._manager.categories.marketing && document.getElementById(_this._pluginPrefix + '-cookie_marketing').checked
        });
        window.setTimeout(function () {
          _this.hide();
        }, 1000);
      });
    }
  }, {
    key: '_getModalTemplate',
    value: function _getModalTemplate() {
      return '<div class="gdpr-cookie-notice-modal">\n      <div class="gdpr-cookie-notice-modal-content">\n        <div class="gdpr-cookie-notice-modal-header">\n          <h2 class="gdpr-cookie-notice-modal-title">{{settings}}</h2>\n          <button type="button" class="gdpr-cookie-notice-modal-close"></button>\n        </div>\n        <ul class="gdpr-cookie-notice-modal-cookies"></ul>\n        <div class="gdpr-cookie-notice-modal-footer">\n          <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement">{{statement}}</a>\n          <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn">\n              <span>{{save}}</span>\n          </a>\n        </div>\n      </div>\n    </div>';
    }
  }, {
    key: '_getCategoryTemplate',
    value: function _getCategoryTemplate() {
      return '<li class="gdpr-cookie-notice-modal-cookie">\n    <div class="gdpr-cookie-notice-modal-cookie-row">\n      <h3 class="gdpr-cookie-notice-modal-cookie-title">{{title}}</h3>\n      <input type="checkbox" name="gdpr-cookie-notice-{{prefix}}" id="gdpr-cookie-notice-{{prefix}}" class="gdpr-cookie-notice-modal-cookie-input" {{checked}}>\n      <label class="gdpr-cookie-notice-modal-cookie-input-switch" for="gdpr-cookie-notice-{{prefix}}"></label>\n    </div>\n    <p class="gdpr-cookie-notice-modal-cookie-info">{{desc}}</p>\n    </li>';
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
//# sourceMappingURL=GdprCookieModal.js.map