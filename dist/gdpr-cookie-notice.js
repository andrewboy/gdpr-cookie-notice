!function (o, e) {'object' == typeof exports && 'object' == typeof module ? module.exports = e() : 'function' == typeof define && define.amd ? define('gdpr-cookie-notice', [], e) : 'object' == typeof exports ? exports['gdpr-cookie-notice'] = e() : o['gdpr-cookie-notice'] = e()}(this, function () {
  return function (o) {
    function e (r) {
      if (t[r]) return t[r].exports
      var n = t[r] = {exports: {}, id: r, loaded: !1}
      return o[r].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
    }

    var t = {}
    return e.m = o, e.c = t, e.p = '', e(0)
  }([function (o, e) {
    'use strict'

    function t (o) {console.log('gdprCookieNotice')}

    o.exports = {gdprCookieNotice: t}
  }])
})