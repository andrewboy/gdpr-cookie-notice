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






var GdprCookie = function () {
  function GdprCookie(name, expiration, domain) {
    _classCallCheck(this, GdprCookie);

    this._name = name;
    this._expiration = expiration;
    this._domain = domain;
  }

  _createClass(GdprCookie, [{
    key: 'isExists',
    value: function isExists() {
      return !!js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.getJSON(this._name);
    }
  }, {
    key: 'set',
    value: function set(isNecessaryAccepted, isAnalyticsAccepted, isPerformanceAccepted, isMarketingAccepted) {
      var value = {
        date: new Date(),
        necessary: isNecessaryAccepted,
        performance: isPerformanceAccepted,
        analytics: isAnalyticsAccepted,
        marketing: isMarketingAccepted
      };

      js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.set(this._name, value, { expires: this._expiration, domain: this._domain });
    }
  }, {
    key: 'isNecessaryAccepted',
    value: function isNecessaryAccepted() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.getJSON(this._name)['necessary'];
    }
  }, {
    key: 'isAnalyticsAccepted',
    value: function isAnalyticsAccepted() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.getJSON(this._name)['analytics'];
    }
  }, {
    key: 'isPerformanceAccepted',
    value: function isPerformanceAccepted() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.getJSON(this._name)['performance'];
    }
  }, {
    key: 'isMarketingAccepted',
    value: function isMarketingAccepted() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.getJSON(this._name)['marketing'];
    }
  }, {
    key: 'get',
    value: function get() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.getJSON(this._name);
    }

    // delete () {
    //
    // }

  }]);

  return GdprCookie;
}();

var GdprCookieNotice = function () {
  function GdprCookieNotice(options) {
    _classCallCheck(this, GdprCookieNotice);

    this._categories = options.categories ? options.categories : [];
    this._locale = options.locale ? options.locale : 'hu';
    this._timeout = options.timeout ? options.timeout : 500;
    this._domain = options.domain ? options.domain : window.location.hostname;
    this._expiration = options.expiration ? options.expiration : 30;
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false;
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice';
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice';
    this._implicit = options.implicit ? options.implicit : false;
    this._cookiesAccepted = false;
    this._statementUrl = options.statementUrl ? options.statementUrl : '';
    this._gdprCookie = new GdprCookie(this._namespace, this._expiration, this._domain);

    if (!this._gdprCookie.isExists()) {
      this.showNotice();

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    } else {
      //   this.deleteCookies(this.getCurrentCookieSelection())
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() });
      document.dispatchEvent(this._gdprCookiesEnabledEvt);
    }
  }

  //NOTICE =============================================================================================================

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
        _this2.showModal();
      });

      acceptButton.addEventListener('click', function (e) {
        e.preventDefault();
        _this2.acceptCategories();
      });
    }
  }, {
    key: 'hideNotice',
    value: function hideNotice() {
      document.documentElement.classList.remove(this._pluginPrefix + '-loaded');
    }

    //MODAL ==============================================================================================================

  }, {
    key: 'buildModal',
    value: function buildModal() {
      // if (modalLoaded) {
      //   return false
      // }

      // Load modal template
      var modalHtml = this.getTemplateHtml('modal', []);

      // Append modal into body
      document.body.insertAdjacentHTML('beforeend', modalHtml);

      // Get empty category list
      var categoryList = document.querySelector('.' + this._pluginPrefix + '-modal-cookies');

      //Load essential cookies
      categoryList.innerHTML += this.getTemplateHtml('category', {
        prefix: 'cookie_essential',
        checked: 'checked="checked"'
      });
      var input = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input');
      var label = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input-switch');
      label.innerHTML = _locales__WEBPACK_IMPORTED_MODULE_1__[this._locale]['always_on'];
      label.classList.add(this._pluginPrefix + '-modal-cookie-state');
      label.classList.remove(this._pluginPrefix + '-modal-cookie-input-switch');
      input.remove();

      for (var catId in this._categories) {
        categoryList.innerHTML += this.getTemplateHtml('category', {
          prefix: 'cookie_' + catId,
          checked: this._isCategoriesCheckedByDefault || this._gdprCookie.isExists() && this._gdprCookie.get()[catId] ? 'checked="checked"' : ''
        });
      }

      // Load click functions
      this.setModalEventListeners();

      // Make sure modal is only loaded once
      // modalLoaded = true
    }
  }, {
    key: 'showModal',
    value: function showModal() {
      this.buildModal();
      document.documentElement.classList.add(this._pluginPrefix + '-show-modal');
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      document.documentElement.classList.remove(this._pluginPrefix + '-show-modal');
    }

    // Click functions in the modal

  }, {
    key: 'setModalEventListeners',
    value: function setModalEventListeners() {
      var _this3 = this;

      var closeButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-close')[0];
      var statementButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-statement')[0];
      var categoryTitles = document.querySelectorAll('.' + this._pluginPrefix + '-modal-cookie-title');
      var saveButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-save')[0];

      closeButton.addEventListener('click', function (e) {
        _this3.hideModal();
        return false;
      });

      statementButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.open(_this3._statementUrl, '_blank');
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
        _this3.acceptCategories();
        window.setTimeout(function () {
          _this3.hideModal();
        }, 1000);
      });
    }

    //COOKIE =============================================================================================================

    // deleteCookies (savedCookies) {
    //   for (let i in this._categories) {
    //     if (Object.keys(savedCookies).indexOf(i) >= 0 || !savedCookies[i]) {
    //       Cookies.remove(i)
    //     }
    //   }
    //
    //   if (!savedCookies) {
    //     this.showNotice()
    //   } else {
    //     this.hideNotice()
    //   }
    // }

  }, {
    key: 'acceptCategories',
    value: function acceptCategories() {
      // let value = {
      //   date: new Date(),
      //   necessary: true,
      // }

      // If request was coming from the modal, check for the settings
      // if (save) {
      //   for (var i = 0; i < categories.length; i++) {
      //     value[categories[i]] = document.getElementById(pluginPrefix + '-cookie_' + categories[i]).checked
      //   }
      // }

      // Cookies.set(this._namespace, value, {expires: this._expiration, domain: this._domain})
      // this.deleteCookies(value)

      // Load marketing scripts that only works when cookies are accepted
      this._gdprCookie.set(true, !!this._categories.performance, !!this._categories.analytics, !!this._categories.marketing);
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() });
      document.dispatchEvent(this._gdprCookiesEnabledEvt);

      if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
        this.hideNotice();
      } else {
        this.showNotice();
      }
    }

    // getCurrentCookieSelection () {
    //   return Cookies.getJSON(this._namespace)
    // }

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

    //GETTER - SETTER ====================================================================================================

  }, {
    key: 'statementUrl',
    set: function set(statementUrl) {
      this._statementUrl = statementUrl;
    },
    get: function get() {
      return this._statementUrl;
    }
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
  bar: "<div class=\"gdpr-cookie-notice\">\n    <p class=\"gdpr-cookie-notice-description\">{{description}}</p>\n    <nav class=\"gdpr-cookie-notice-nav\">\n      <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings\">{{settings}}</a>\n      <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn\">{{accept}}</a>\n    </div>\n  </div>",
  category: "<li class=\"gdpr-cookie-notice-modal-cookie\">\n    <div class=\"gdpr-cookie-notice-modal-cookie-row\">\n      <h3 class=\"gdpr-cookie-notice-modal-cookie-title\">{{title}}</h3>\n      <input type=\"checkbox\" name=\"gdpr-cookie-notice-{{prefix}}\" id=\"gdpr-cookie-notice-{{prefix}}\" class=\"gdpr-cookie-notice-modal-cookie-input\" {{checked}}>\n      <label class=\"gdpr-cookie-notice-modal-cookie-input-switch\" for=\"gdpr-cookie-notice-{{prefix}}\"></label>\n    </div>\n    <p class=\"gdpr-cookie-notice-modal-cookie-info\">{{desc}}</p>\n  </li>",
  modal: "<div class=\"gdpr-cookie-notice-modal\">\n    <div class=\"gdpr-cookie-notice-modal-content\">\n      <div class=\"gdpr-cookie-notice-modal-header\">\n        <h2 class=\"gdpr-cookie-notice-modal-title\">{{settings}</h2>\n        <button type=\"button\" class=\"gdpr-cookie-notice-modal-close\"></button>\n      </div>\n      <ul class=\"gdpr-cookie-notice-modal-cookies\"></ul>\n      <div class=\"gdpr-cookie-notice-modal-footer\">\n        <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement\">{{statement}}</a>\n        <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn\">\n            <span>{{save}}</span>\n        </a>\n      </div>\n    </div>\n  </div>"
});

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=gdpr-cookie-notice.js.map