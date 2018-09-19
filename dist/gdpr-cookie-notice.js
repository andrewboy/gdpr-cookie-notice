(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GdprCookieNotice"] = factory();
	else
		root["GdprCookieNotice"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/js-cookie/src/js.cookie.js":
/*!*************************************************!*\
  !*** ./node_modules/js-cookie/src/js.cookie.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template */ "./src/template.js");
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locales */ "./src/locales/index.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sass_gdpr_cookie_notice_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sass/gdpr-cookie-notice.scss */ "./src/sass/gdpr-cookie-notice.scss");
/* harmony import */ var _sass_gdpr_cookie_notice_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_sass_gdpr_cookie_notice_scss__WEBPACK_IMPORTED_MODULE_3__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var GdprCookieNotice = function () {
  function GdprCookieNotice(options) {
    _classCallCheck(this, GdprCookieNotice);

    this._categories = options.categories ? options.categories : [];
    // this._categorySettings = []
    this._locale = options.locale ? options.locale : 'hu';
    this._timeout = options.timeout ? options.timeout : 500;
    this._domain = options.domain ? options.domain : window.location.hostname;
    this._expiration = options.expiration ? options.expiration : 30;
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false;
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice';
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice';
    this._implicit = options.implicit ? options.implicit : false;
    this._cookiesAccepted = false;

    // if (options.performance && options.performance.length) {
    //   this._categorySettings.performance = options.performance
    //   this._categories.push('performance')
    // }
    //
    // if (options.analytics && options.analytics.length) {
    //   this._categorySettings.analytics = options.analytics
    //   this._categories.push('analytics')
    // }
    //
    // if (options.marketing && options.marketing.length) {
    //   this._categorySettings.marketing = options.marketing
    //   this._categories.push('marketing')
    // }

    // console.log('gdprCookieNotice', locales, locales.hu, template)
    // console.log(this.getCurrentCookieSelection())

    this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this.getCurrentCookieSelection() });

    if (!this.getCurrentCookieSelection()) {
      this.showNotice();

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    }
    // else {
    //   this.deleteCookies(this.getCurrentCookieSelection())
    //   document.dispatchEvent(this._gdprCookiesEnabledEvt)
    // }
  }

  _createClass(GdprCookieNotice, [{
    key: 'showNotice',
    value: function showNotice() {
      var _this = this;

      this.buildNotice();

      // Show the notice with a little timeout
      window.setTimeout(function () {
        document.documentElement.classList.add(_this._pluginPrefix + '-loaded');
      }, this._timeout);
    }
  }, {
    key: 'buildNotice',
    value: function buildNotice() {
      var _this2 = this;

      console.log(this.getTemplateHtml('bar', _locales__WEBPACK_IMPORTED_MODULE_1__[this._locale]));
      document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml('bar', _locales__WEBPACK_IMPORTED_MODULE_1__[this._locale]));
      var settingsButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-settings')[0];
      var acceptButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-accept')[0];

      settingsButton.addEventListener('click', function (e) {
        e.preventDefault();
        // showModal()
      });

      acceptButton.addEventListener('click', function (e) {
        e.preventDefault();
        _this2.acceptCookies();
      });
    }
  }, {
    key: 'acceptCookies',
    value: function acceptCookies(save) {
      var value = {
        date: new Date(),
        necessary: true
      };

      for (var i in this._categories) {
        console.log(i, this._categories[i]);
      }

      // categories.forEach(function (cat) {
      //   value[cat] = true
      // })
      //
      // // If request was coming from the modal, check for the settings
      // if (save) {
      //   for (var i = 0; i < categories.length; i++) {
      //     value[categories[i]] = document.getElementById(pluginPrefix + '-cookie_' + categories[i]).checked
      //   }
      // }
      //
      // gdprCookies.set(namespace, value, {expires: config.expiration, domain: config.domain})
      // deleteCookies(value)
      //
      // // Load marketing scripts that only works when cookies are accepted
      // cookiesAcceptedEvent = new CustomEvent('gdprCookiesEnabled', {detail: value})
      // document.dispatchEvent(cookiesAcceptedEvent)
    }
  }, {
    key: 'getTemplateHtml',
    value: function getTemplateHtml(templateKey, data) {
      var templateStr = _template__WEBPACK_IMPORTED_MODULE_0__["default"][templateKey];

      // console.log('templateStr', templateStr, data)

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
      return js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.getJSON(this._namespace);
    }

    // deleteCookies (savedCookies) {
    // let notAllEnabled = false
    //
    // for (let i = 0; i < this._categories.length; i++) {
    //   if (config[categories[i]] && !savedCookies[categories[i]]) {
    //     for (var ii = 0; ii < config[categories[i]].length; ii++) {
    //       gdprCookies.remove(config[categories[i]][ii])
    //       notAllEnabled = true
    //     }
    //   }
    // }
    // if (!savedCookies && !gdprCookies) {
    //   showNotice()
    // } else {
    //   hideNotice()
    // }
    // }

    // acceptOnScroll () {
    //   window.addEventListener('scroll', function _listener () {
    //     if (this.amountScrolled()) {
    //       this.acceptCookies()
    //       window.removeEventListener('click', _listener)
    //     }
    //   })
    // }

    // acceptCookies (save) {
    //
    // }

    // amountScrolled () {
    //   let winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
    //   let docheight = this.getDocHeight()
    //   let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    //   let trackLength = docheight - winheight
    //   let pctScrolled = Math.floor(scrollTop / trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    //   if (pctScrolled > 25 && !this._cookiesAccepted) {
    //     this._cookiesAccepted = true
    //     return true
    //   } else {
    //     return false
    //   }
    // }

    // getDocHeight () {
    //   return Math.max(
    //     document.body.scrollHeight, document.documentElement.scrollHeight,
    //     document.body.offsetHeight, document.documentElement.offsetHeight,
    //     document.body.clientHeight, document.documentElement.clientHeight
    //   )
    // }

    //GETTER - SETTER

  }, {
    key: 'implicit',
    set: function set(isImplicit) {
      this._implicit = isImplicit;
    },
    get: function get() {
      return this._implicit;
    }
  }, {
    key: 'cookiesAccepted',
    set: function set(isAccepted) {
      this._cookiesAccepted = isAccepted;
    },
    get: function get() {
      return this._cookiesAccepted;
    }
  }, {
    key: 'categories',
    set: function set(categories) {
      this._categories = categories;
    },
    get: function get() {
      return this._categories;
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
    key: 'isCategoriesCheckedByDefault',
    set: function set(isCategoriesCheckedByDefault) {
      this._isCategoriesCheckedByDefault = isCategoriesCheckedByDefault;
    },
    get: function get() {
      return this._isCategoriesCheckedByDefault;
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


/* harmony default export */ __webpack_exports__["default"] = ({ GdprCookieNotice: GdprCookieNotice });

/***/ }),

/***/ "./src/locales/hu.js":
/*!***************************!*\
  !*** ./src/locales/hu.js ***!
  \***************************/
/*! exports provided: hu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hu", function() { return hu; });
var hu = {
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
};


/* harmony default export */ __webpack_exports__["default"] = (hu);

/***/ }),

/***/ "./src/locales/index.js":
/*!******************************!*\
  !*** ./src/locales/index.js ***!
  \******************************/
/*! exports provided: hu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hu */ "./src/locales/hu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hu", function() { return _hu__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./src/sass/gdpr-cookie-notice.scss":
/*!******************************************!*\
  !*** ./src/sass/gdpr-cookie-notice.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/template.js":
/*!*************************!*\
  !*** ./src/template.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  bar: "<div class=\"gdpr-cookie-notice\">\n" + "  <p class=\"gdpr-cookie-notice-description\">{{description}}</p>\n" + "  <nav class=\"gdpr-cookie-notice-nav\">\n" + "    <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings\">{{settings}}</a>\n" + "    <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn\">{{accept}}</a>\n" + "  </div>\n" + "</div>\n" + "",
  category: "<li class=\"gdpr-cookie-notice-modal-cookie\">\n" + "  <div class=\"gdpr-cookie-notice-modal-cookie-row\">\n" + "    <h3 class=\"gdpr-cookie-notice-modal-cookie-title\">{{title}}</h3>\n" + "    <input type=\"checkbox\" name=\"gdpr-cookie-notice-{{prefix}}\" id=\"gdpr-cookie-notice-{{prefix}}\" class=\"gdpr-cookie-notice-modal-cookie-input\" {{checked}}>\n" + "    <label class=\"gdpr-cookie-notice-modal-cookie-input-switch\" for=\"gdpr-cookie-notice-{{prefix}}\"></label>\n" + "  </div>\n" + "  <p class=\"gdpr-cookie-notice-modal-cookie-info\">{{desc}}</p>\n" + "</li>\n" + "",
  modal: "<div class=\"gdpr-cookie-notice-modal\">\n" + "  <div class=\"gdpr-cookie-notice-modal-content\">\n" + "    <div class=\"gdpr-cookie-notice-modal-header\">\n" + "      <h2 class=\"gdpr-cookie-notice-modal-title\">{{settings}</h2>\n" + "      <button type=\"button\" class=\"gdpr-cookie-notice-modal-close\"></button>\n" + "    </div>\n" + "    <ul class=\"gdpr-cookie-notice-modal-cookies\"></ul>\n" + "    <div class=\"gdpr-cookie-notice-modal-footer\">\n" + "      <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement\">{{statement}}</a>\n" + "      <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn\"><span>{{save}}</span></a>\n" + "    </div>\n" + "  </div>\n" + "</div>\n" + ""
});

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=gdpr-cookie-notice.js.map