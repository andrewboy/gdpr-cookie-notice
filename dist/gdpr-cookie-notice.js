!function (e, o) {'object' == typeof exports && 'object' == typeof module ? module.exports = o() : 'function' == typeof define && define.amd ? define('gdpr-cookie-notice', [], o) : 'object' == typeof exports ? exports['gdpr-cookie-notice'] = o() : e['gdpr-cookie-notice'] = o()}(this, function () {
  return function (e) {
    function o (n) {
      if (t[n]) return t[n].exports
      var i = t[n] = {exports: {}, id: n, loaded: !1}
      return e[n].call(i.exports, i, i.exports, o), i.loaded = !0, i.exports
    }

    var t = {}
    return o.m = e, o.c = t, o.p = '', o(0)
  }([function (e, o, t) {
    'use strict'

    function n (e) {
      if (e && e.__esModule) return e
      var o = {}
      if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (o[t] = e[t])
      return o['default'] = e, o
    }

    function i (e) {return e && e.__esModule ? e : {'default': e}}

    function c (e) {
      var o = 'gdprcookienotice'
      console.log('gdprCookieNotice')
      var t = a(o)
      console.log(t)
    }

    function a (e) {return d['default'].getJSON(e)}

    var r = t(1), l = (i(r), t(2)), s = (n(l), t(4)), d = i(s)
    e.exports = {gdprCookieNotice: c}
  }, function (e, o) {
    'use strict'
    Object.defineProperty(o, '__esModule', {value: !0}), o['default'] = {
      bar: '<div class="gdpr-cookie-notice">\n  <p class="gdpr-cookie-notice-description">{description}</p>\n  <nav class="gdpr-cookie-notice-nav">\n    <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{settings}</a>\n    <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{accept}</a>\n  </div>\n</div>\n',
      category: '<li class="gdpr-cookie-notice-modal-cookie">\n  <div class="gdpr-cookie-notice-modal-cookie-row">\n    <h3 class="gdpr-cookie-notice-modal-cookie-title">{title}</h3>\n    <input type="checkbox" name="gdpr-cookie-notice-{prefix}" id="gdpr-cookie-notice-{prefix}" class="gdpr-cookie-notice-modal-cookie-input" {checked}>\n    <label class="gdpr-cookie-notice-modal-cookie-input-switch" for="gdpr-cookie-notice-{prefix}"></label>\n  </div>\n  <p class="gdpr-cookie-notice-modal-cookie-info">{desc}</p>\n</li>\n',
      modal: '<div class="gdpr-cookie-notice-modal">\n  <div class="gdpr-cookie-notice-modal-content">\n    <div class="gdpr-cookie-notice-modal-header">\n      <h2 class="gdpr-cookie-notice-modal-title">{settings}</h2>\n      <button type="button" class="gdpr-cookie-notice-modal-close"></button>\n    </div>\n    <ul class="gdpr-cookie-notice-modal-cookies"></ul>\n    <div class="gdpr-cookie-notice-modal-footer">\n      <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement">{statement}</a>\n      <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn"><span>{save}</span></a>\n    </div>\n  </div>\n</div>\n'
    }
  }, function (e, o, t) {
    'use strict'

    function n (e) {return e && e.__esModule ? e : {'default': e}}

    var i = t(3)
    n(i)
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
  }, function (e, o, t) {
    var n, i
    !function (c) {
      var a = !1
      if (n = c, i = 'function' == typeof n ? n.call(o, t, o, e) : n, !(void 0 !== i && (e.exports = i)), a = !0, e.exports = c(), a = !0, !a) {
        var r = window.Cookies, l = window.Cookies = c()
        l.noConflict = function () {return window.Cookies = r, l}
      }
    }(function () {
      function e () {
        for (var e = 0, o = {}; e < arguments.length; e++) {
          var t = arguments[e]
          for (var n in t) o[n] = t[n]
        }
        return o
      }

      function o (t) {
        function n (o, i, c) {
          var a
          if ('undefined' != typeof document) {
            if (arguments.length > 1) {
              if (c = e({path: '/'}, n.defaults, c), 'number' == typeof c.expires) {
                var r = new Date
                r.setMilliseconds(r.getMilliseconds() + 864e5 * c.expires), c.expires = r
              }
              c.expires = c.expires ? c.expires.toUTCString() : ''
              try {a = JSON.stringify(i), /^[\{\[]/.test(a) && (i = a)} catch (l) {}
              i = t.write ? t.write(i, o) : encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), o = encodeURIComponent(String(o)), o = o.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), o = o.replace(/[\(\)]/g, escape)
              var s = ''
              for (var d in c) c[d] && (s += '; ' + d, c[d] !== !0 && (s += '=' + c[d]))
              return document.cookie = o + '=' + i + s
            }
            o || (a = {})
            for (var k = document.cookie ? document.cookie.split('; ') : [], p = /(%[0-9A-Z]{2})+/g, u = 0; u < k.length; u++) {
              var f = k[u].split('='), g = f.slice(1).join('=')
              this.json || '"' !== g.charAt(0) || (g = g.slice(1, -1))
              try {
                var m = f[0].replace(p, decodeURIComponent)
                if (g = t.read ? t.read(g, m) : t(g, m) || g.replace(p, decodeURIComponent), this.json) try {g = JSON.parse(g)} catch (l) {}
                if (o === m) {
                  a = g
                  break
                }
                o || (a[m] = g)
              } catch (l) {}
            }
            return a
          }
        }

        return n.set = n, n.get = function (e) {return n.call(n, e)}, n.getJSON = function () {return n.apply({json: !0}, [].slice.call(arguments))}, n.defaults = {}, n.remove = function (o, t) {n(o, '', e(t, {expires: -1}))}, n.withConverter = o, n
      }

      return o(function () {})
    })
  }])
})