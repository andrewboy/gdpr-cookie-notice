!function (e, o) {'object' == typeof exports && 'object' == typeof module ? module.exports = o() : 'function' == typeof define && define.amd ? define('gdpr-cookie-notice', [], o) : 'object' == typeof exports ? exports['gdpr-cookie-notice'] = o() : e['gdpr-cookie-notice'] = o()}(this, function () {
  return function (e) {
    function o (i) {
      if (t[i]) return t[i].exports
      var n = t[i] = {exports: {}, id: i, loaded: !1}
      return e[i].call(n.exports, n, n.exports, o), n.loaded = !0, n.exports
    }

    var t = {}
    return o.m = e, o.c = t, o.p = '', o(0)
  }([function (e, o, t) {
    'use strict'

    function i (e) {
      if (e && e.__esModule) return e
      var o = {}
      if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (o[t] = e[t])
      return o['default'] = e, o
    }

    function n (e) {return e && e.__esModule ? e : {'default': e}}

    function a (e) {console.log(s.hu)}

    var c = t(1), l = (n(c), t(2)), s = i(l)
    e.exports = {gdprCookieNotice: a}
  }, function (e, o) {
    'use strict'
    Object.defineProperty(o, '__esModule', {value: !0}), o['default'] = {
      bar: '<div class="gdpr-cookie-notice">\n  <p class="gdpr-cookie-notice-description">{description}</p>\n  <nav class="gdpr-cookie-notice-nav">\n    <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{settings}</a>\n    <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{accept}</a>\n  </div>\n</div>\n',
      category: '<li class="gdpr-cookie-notice-modal-cookie">\n  <div class="gdpr-cookie-notice-modal-cookie-row">\n    <h3 class="gdpr-cookie-notice-modal-cookie-title">{title}</h3>\n    <input type="checkbox" name="gdpr-cookie-notice-{prefix}" id="gdpr-cookie-notice-{prefix}" class="gdpr-cookie-notice-modal-cookie-input" {checked}>\n    <label class="gdpr-cookie-notice-modal-cookie-input-switch" for="gdpr-cookie-notice-{prefix}"></label>\n  </div>\n  <p class="gdpr-cookie-notice-modal-cookie-info">{desc}</p>\n</li>\n',
      modal: '<div class="gdpr-cookie-notice-modal">\n  <div class="gdpr-cookie-notice-modal-content">\n    <div class="gdpr-cookie-notice-modal-header">\n      <h2 class="gdpr-cookie-notice-modal-title">{settings}</h2>\n      <button type="button" class="gdpr-cookie-notice-modal-close"></button>\n    </div>\n    <ul class="gdpr-cookie-notice-modal-cookies"></ul>\n    <div class="gdpr-cookie-notice-modal-footer">\n      <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement">{statement}</a>\n      <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn"><span>{save}</span></a>\n    </div>\n  </div>\n</div>\n'
    }
  }, function (e, o, t) {
    'use strict'

    function i (e) {return e && e.__esModule ? e : {'default': e}}

    var n = t(3)
    i(n)
  }, function (e, o) {
    'use strict'
    Object.defineProperty(o, '__esModule', {value: !0}), o['default'] = {
      description: 'Ez a weboldal sütiket(cookie-kat) használ azért, hogy a weboldal működjön, statisztikai adatokat gyűjtsön és jobb felhasználió élményt nyújtson. A Süti beállítások gombra kattintva több információt is megtudhat erről. Az oldal további használatával beleegyezik a sütik használatába.',
      settings: 'Süti beállítások',
      accept: 'Elfogadom',
      statement: 'Süti nyilatkozatunk',
      save: 'Mentés',
      always_on: 'Mindig betölt',
      cookie_essential_title: 'Szükséges sütik',
      cookie_essential_desc: 'Ezek a weboldal megfelelő megjelenéséhez szükséges sütik, amelyek nélkül nem működne a weboldal.',
      cookie_performance_title: 'Teljesítmény sütik',
      cookie_performance_desc: 'Ezek a sütik kiegészítő funkciókat támogatnak az oldalon, például eltárolja, hogy milyen nyelven böngészi a weboldalt. Ezek nélkül nem biztos, hogy minden megfelelően fog működni.',
      cookie_analytics_title: 'Statisztika sütik',
      cookie_analytics_desc: 'Ezeket azért használjuk, hogy tájékozódni tudjunk arról, mikor, hányan és hogyan használják a weboldalunkat. Ezekkel az adatokkal tudjuk később optimalizálni a weboldalunkat a megfelelő felhasználói élményért.',
      cookie_marketing_title: 'Marketing sütik',
      cookie_marketing_desc: 'Ezek a sütik segítenek nekünk a hirdetések kezelésében, célzásában.'
    }
  }])
})