'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GdprCookieNoticeManager = exports.GdprCookieModal = exports.GdprCookieNoticePopup = exports.GdprCookie = exports.GdprCookieNotice = undefined;

var _GdprCookie = require('./GdprCookie');

var _GdprCookie2 = _interopRequireDefault(_GdprCookie);

var _GdprCookieNoticePopup = require('./GdprCookieNoticePopup');

var _GdprCookieNoticePopup2 = _interopRequireDefault(_GdprCookieNoticePopup);

var _GdprCookieModal = require('./GdprCookieModal');

var _GdprCookieModal2 = _interopRequireDefault(_GdprCookieModal);

var _GdprCookieNoticeManager = require('./GdprCookieNoticeManager');

var _GdprCookieNoticeManager2 = _interopRequireDefault(_GdprCookieNoticeManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './sass/gdpr-cookie-notice.scss'
// import "sass/modal/_variables.scss";
// import "sass/notice2/_variables.scss";

var GdprCookieNotice = {
  GdprCookie: _GdprCookie2.default,
  GdprCookieNoticePopup: _GdprCookieNoticePopup2.default,
  GdprCookieModal: _GdprCookieModal2.default,
  GdprCookieNoticeManager: _GdprCookieNoticeManager2.default
};

exports.default = GdprCookieNotice;
exports.GdprCookieNotice = GdprCookieNotice;
exports.GdprCookie = _GdprCookie2.default;
exports.GdprCookieNoticePopup = _GdprCookieNoticePopup2.default;
exports.GdprCookieModal = _GdprCookieModal2.default;
exports.GdprCookieNoticeManager = _GdprCookieNoticeManager2.default;
//# sourceMappingURL=index.js.map