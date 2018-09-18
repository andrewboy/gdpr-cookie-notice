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

require('./sass/main.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// function gdprCookieNotice (extOpts) {
//   let defOpts = {
//     locale: 'hu',
//     timeout: 500,
//     domain: null,
//     expiration: 30,
//     defaultChecked: false,
//     namespace: 'gdprcookienotice',
//     pluginPrefix: 'gdpr-cookie-notice'
//   }
//   let opts = Object.assign({}, defOpts, extOpts)
//
//   let categories = []
//   let currentCookieSelection = getCookie()
//
//   console.log('gdprCookieNotice', locales, locales.hu, template)
//   console.log(currentCookieSelection)
//
//   // if (!currentCookieSelection) {
//     showNotice()
//   // } else {
//   //
//   // }
//
//   function showNotice () {
//     buildNotice()
//
//     // setTimeout(function(){
//     //   document.documentElement.classList.add(pluginPrefix+'-loaded');
//     // }, config.timeout);
//   }
//
//   function buildNotice () {
//     document.body.insertAdjacentHTML('beforeend', getTemplateHtml('bar', locales[opts.locale]))
//   }
//
//   function getTemplateHtml (templateKey, data) {
//     let templateStr = template[templateKey]
//
//     console.log('templateStr', templateStr, data)
//
//     if (typeof templateStr === 'string' && (data instanceof Object)) {
//         return templateStr.replace(/{{([^}]+)}}/g, function (i, j) {
//           if (data[j]) {
//             return data[j]
//           } else {
//             return i
//           }
//         })
//     } else {
//       return false
//     }
//   }
//
//   function getCookie () {
//     return Cookies.getJSON(opts.namespace)
//   }
// }

var GdprCookieNotice = function () {
  function GdprCookieNotice(options) {
    _classCallCheck(this, GdprCookieNotice);

    this._locale = options.locale ? options.locale : 'hu';
    this._timeout = options.timeout ? options.timeout : 500;
    this._domain = options.domain ? options.domain : null;
    this._expiration = options.expiration ? options.expiration : 30;
    this._defaultChecked = options.setDefaultChecked ? options.setDefaultChecked : false;
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice';
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice';

    console.log('gdprCookieNotice', locales, locales.hu, _template2.default);
    console.log(this.getCurrentCookieSelection());

    this.showNotice();
  }

  _createClass(GdprCookieNotice, [{
    key: 'showNotice',
    value: function showNotice() {
      this.buildNotice();
    }
  }, {
    key: 'buildNotice',
    value: function buildNotice() {
      document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml('bar', locales[this._locale]));
    }
  }, {
    key: 'getTemplateHtml',
    value: function getTemplateHtml(templateKey, data) {
      var templateStr = _template2.default[templateKey];

      console.log('templateStr', templateStr, data);

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
    key: 'defaultChecked',
    set: function set(isDefaultChecked) {
      this._defaultChecked = isDefaultChecked;
    },
    get: function get() {
      return this._defaultChecked;
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