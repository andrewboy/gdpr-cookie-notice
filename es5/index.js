'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GdprCookieModal = exports.GdprCookieNoticePopup = exports.GdprCookie = exports.GdprCookieNotice = undefined;

var _locales = require('./locales');

var locales = _interopRequireWildcard(_locales);

var _GdprCookie = require('./GdprCookie');

var _GdprCookie2 = _interopRequireDefault(_GdprCookie);

var _GdprCookieNoticePopup = require('./GdprCookieNoticePopup');

var _GdprCookieNoticePopup2 = _interopRequireDefault(_GdprCookieNoticePopup);

var _GdprCookieModal = require('./GdprCookieModal');

var _GdprCookieModal2 = _interopRequireDefault(_GdprCookieModal);

var _GdprCookieNoticeManager = require('./GdprCookieNoticeManager');

var _GdprCookieNoticeManager2 = _interopRequireDefault(_GdprCookieNoticeManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import './sass/gdpr-cookie-notice.scss'
// import "sass/modal/_variables.scss";
// import "sass/notice2/_variables.scss";

exports.GdprCookieNotice = _GdprCookieNoticeManager2.default;
exports.GdprCookie = _GdprCookie2.default;
exports.GdprCookieNoticePopup = _GdprCookieNoticePopup2.default;
exports.GdprCookieModal = _GdprCookieModal2.default; // import { default as template } from './template'

exports.default = _GdprCookieNoticeManager2.default;
//# sourceMappingURL=index.js.map