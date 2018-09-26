"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  bar: "<div class=\"gdpr-cookie-notice\">\n    <p class=\"gdpr-cookie-notice-description\">{{description}}</p>\n    <nav class=\"gdpr-cookie-notice-nav\">\n      <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings\">{{settings}}</a>\n      <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn\">{{accept}}</a>\n    </nav>\n  </div>",
  category: "<li class=\"gdpr-cookie-notice-modal-cookie\">\n    <div class=\"gdpr-cookie-notice-modal-cookie-row\">\n      <h3 class=\"gdpr-cookie-notice-modal-cookie-title\">{{title}}</h3>\n      <input type=\"checkbox\" name=\"gdpr-cookie-notice-{{prefix}}\" id=\"gdpr-cookie-notice-{{prefix}}\" class=\"gdpr-cookie-notice-modal-cookie-input\" {{checked}}>\n      <label class=\"gdpr-cookie-notice-modal-cookie-input-switch\" for=\"gdpr-cookie-notice-{{prefix}}\"></label>\n    </div>\n    <p class=\"gdpr-cookie-notice-modal-cookie-info\">{{desc}}</p>\n  </li>",
  modal: "<div class=\"gdpr-cookie-notice-modal\">\n    <div class=\"gdpr-cookie-notice-modal-content\">\n      <div class=\"gdpr-cookie-notice-modal-header\">\n        <h2 class=\"gdpr-cookie-notice-modal-title\">{{settings}}</h2>\n        <button type=\"button\" class=\"gdpr-cookie-notice-modal-close\"></button>\n      </div>\n      <ul class=\"gdpr-cookie-notice-modal-cookies\"></ul>\n      <div class=\"gdpr-cookie-notice-modal-footer\">\n        <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement\">{{statement}}</a>\n        <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn\">\n            <span>{{save}}</span>\n        </a>\n      </div>\n    </div>\n  </div>"
};
//# sourceMappingURL=template.js.map