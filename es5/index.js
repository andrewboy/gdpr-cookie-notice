'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _locales = require('./locales');

var locales = _interopRequireWildcard(_locales);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

require('./sass/main.scss');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gdprCookieNotice(extOpts) {
  var defOpts = {
    locale: 'hu',
    timeout: 500,
    domain: null,
    expiration: 30,
    defaultChecked: false,
    namespace: 'gdprcookienotice',
    pluginPrefix: 'gdpr-cookie-notice'
  };
  var opts = Object.assign({}, defOpts, extOpts);

  var categories = [];
  var currentCookieSelection = getCookie();

  console.log('gdprCookieNotice', locales, locales.hu, _template2.default);
  console.log(currentCookieSelection);

  // if (!currentCookieSelection) {
  showNotice();
  // } else {
  //
  // }

  function showNotice() {
    buildNotice();

    // setTimeout(function(){
    //   document.documentElement.classList.add(pluginPrefix+'-loaded');
    // }, config.timeout);
  }

  function buildNotice() {
    document.body.insertAdjacentHTML('beforeend', getTemplateHtml('bar', locales[opts.locale]));
  }

  function getTemplateHtml(templateKey, data) {
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

  function getCookie() {
    return _jsCookie2.default.getJSON(opts.namespace);
  }
}

exports.default = { gdprCookieNotice: gdprCookieNotice };
//# sourceMappingURL=index.js.map