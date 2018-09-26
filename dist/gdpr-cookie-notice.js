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

/***/ "./src/GdprCookie.js":
/*!***************************!*\
  !*** ./src/GdprCookie.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var _class = function () {
  function _class(name, expiration, domain) {
    _classCallCheck(this, _class);

    this._name = name;
    this._expiration = expiration;
    this._domain = domain;
  }

  _createClass(_class, [{
    key: 'isExists',
    value: function isExists() {
      return !!js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name);
    }
  }, {
    key: 'set',
    value: function set(isNecessaryAccepted, isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted) {
      var value = {
        date: new Date(),
        necessary: isNecessaryAccepted,
        performance: isPerformanceAccepted,
        analytics: isAnalyticsAccepted,
        marketing: isMarketingAccepted
      };

      js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set(this._name, value, { expires: this._expiration, domain: this._domain });
    }
  }, {
    key: 'isNecessaryAccepted',
    value: function isNecessaryAccepted() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name)['necessary'];
    }
  }, {
    key: 'isAnalyticsAccepted',
    value: function isAnalyticsAccepted() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name)['analytics'];
    }
  }, {
    key: 'isPerformanceAccepted',
    value: function isPerformanceAccepted() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name)['performance'];
    }
  }, {
    key: 'isMarketingAccepted',
    value: function isMarketingAccepted() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name)['marketing'];
    }
  }, {
    key: 'get',
    value: function get() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name);
    }

    // delete () {
    //
    // }

  }]);

  return _class;
}();

/* harmony default export */ __webpack_exports__["default"] = (_class);

/***/ }),

/***/ "./src/GdprCookieModal.js":
/*!********************************!*\
  !*** ./src/GdprCookieModal.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_variables_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/_variables.scss */ "./src/sass/_variables.scss");
/* harmony import */ var _sass_variables_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_variables_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sass_modal_modal_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sass/modal/_modal.scss */ "./src/sass/modal/_modal.scss");
/* harmony import */ var _sass_modal_modal_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sass_modal_modal_scss__WEBPACK_IMPORTED_MODULE_1__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var _class = function () {
  function _class(gdprCookieManager) {
    _classCallCheck(this, _class);

    this._manager = gdprCookieManager;
    this._locale = {
      modal: {
        settings: 'Süti beállítások',
        statement: 'Süti nyilatkozatunk',
        save: 'Mentés'
      },
      category: {
        essential: {
          title: 'Szükséges sütik',
          desc: 'Ezek a weboldal megfelelő megjelenéséhez szükséges sütik, amelyek nélkül nem működne a weboldal.',
          always_on: 'Mindig betölt'
        },
        performance: {
          title: 'Teljesítmény sütik',
          desc: 'Ezek a s\xFCtik kieg\xE9sz\xEDt\u0151 funkci\xF3kat t\xE1mogatnak az oldalon, p\xE9ld\xE1ul elt\xE1rolja, hogy milyen nyelven b\xF6ng\xE9szi \n          a weboldalt. Ezek n\xE9lk\xFCl nem biztos, hogy minden megfelel\u0151en fog m\u0171k\xF6dni.'
        },
        analytics: {
          title: 'Statisztika sütik',
          desc: 'Ezeket az\xE9rt haszn\xE1ljuk, hogy t\xE1j\xE9koz\xF3dni tudjunk arr\xF3l, mikor, h\xE1nyan \xE9s hogyan haszn\xE1lj\xE1k a \n          weboldalunkat. Ezekkel az adatokkal tudjuk k\xE9s\u0151bb optimaliz\xE1lni a weboldalunkat a megfelel\u0151 felhaszn\xE1l\xF3i \n          \xE9lm\xE9ny\xE9rt.'
        },
        marketing: {
          title: 'Marketing sütik',
          desc: 'Ezek a sütik segítenek nekünk a hirdetések kezelésében, célzásában.'
        }
      }
    };
    this._pluginPrefix = 'gdpr-cookie-notice';
    this._isModalLoaded = false;
    this._isCategoriesCheckedByDefault = false;
    this._statementUrl = 'https://index.hu/';
  }

  _createClass(_class, [{
    key: 'build',
    value: function build() {
      if (this._isModalLoaded) {
        return;
      }

      // Append modal into body
      document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml(this._getModalTemplate(), this._locale.modal));

      // Get empty category list
      var categoryList = document.querySelector('.' + this._pluginPrefix + '-modal-cookies');

      //Load essential cookies
      categoryList.innerHTML += this.getTemplateHtml(this._getCategoryTemplate(), Object.assign({}, this._locale.category.essential, {
        prefix: 'cookie_essential',
        checked: 'checked="checked"'
      }));
      var input = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input');
      var label = document.querySelector('.' + this._pluginPrefix + '-modal-cookie-input-switch');
      label.innerHTML = this._locale.category.essential.always_on;
      label.classList.add(this._pluginPrefix + '-modal-cookie-state');
      label.classList.remove(this._pluginPrefix + '-modal-cookie-input-switch');
      input.remove();

      for (var catId in this._manager.categories) {
        categoryList.innerHTML += this.getTemplateHtml(this._getCategoryTemplate(), Object.assign({}, this._locale.category[catId], {
          prefix: 'cookie_' + catId,
          // checked: this._isCategoriesCheckedByDefault || (this._gdprCookie.isExists() && this._gdprCookie.get()[catId])
          checked: true ? 'checked="checked"' : undefined
        }));
      }

      // Load click functions
      this.setModalEventListeners();

      // Make sure modal is only loaded once
      this._isModalLoaded = true;
    }
  }, {
    key: 'show',
    value: function show() {
      this.build();
      document.documentElement.classList.add(this._pluginPrefix + '-show-modal');
    }
  }, {
    key: 'hide',
    value: function hide() {
      document.documentElement.classList.remove(this._pluginPrefix + '-show-modal');
    }

    // Click functions in the modal

  }, {
    key: 'setModalEventListeners',
    value: function setModalEventListeners() {
      var _this = this;

      var closeButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-close')[0];
      var statementButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-statement')[0];
      var categoryTitles = document.querySelectorAll('.' + this._pluginPrefix + '-modal-cookie-title');
      var saveButton = document.querySelectorAll('.' + this._pluginPrefix + '-modal-footer-item-save')[0];

      closeButton.addEventListener('click', function (e) {
        _this.hide();
        return false;
      });

      statementButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.open(_this._statementUrl, '_blank');
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

        var categorySettings = {};

        for (var catId in _this._manager.categories) {
          categorySettings[catId] = document.getElementById(_this._pluginPrefix + '-cookie_' + catId).checked;
        }

        _this._manager.setEvent('accept_categories', {
          performance: !!_this._manager.categories.performance && document.getElementById(_this._pluginPrefix + '-cookie_performance').checked,
          analytics: !!_this._manager.categories.analytics && document.getElementById(_this._pluginPrefix + '-cookie_analytics').checked,
          marketing: !!_this._manager.categories.marketing && document.getElementById(_this._pluginPrefix + '-cookie_marketing').checked
        });
        window.setTimeout(function () {
          _this.hide();
        }, 1000);
      });
    }
  }, {
    key: '_getModalTemplate',
    value: function _getModalTemplate() {
      return '<div class="gdpr-cookie-notice-modal">\n      <div class="gdpr-cookie-notice-modal-content">\n        <div class="gdpr-cookie-notice-modal-header">\n          <h2 class="gdpr-cookie-notice-modal-title">{{settings}}</h2>\n          <button type="button" class="gdpr-cookie-notice-modal-close"></button>\n        </div>\n        <ul class="gdpr-cookie-notice-modal-cookies"></ul>\n        <div class="gdpr-cookie-notice-modal-footer">\n          <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement">{{statement}}</a>\n          <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn">\n              <span>{{save}}</span>\n          </a>\n        </div>\n      </div>\n    </div>';
    }
  }, {
    key: '_getCategoryTemplate',
    value: function _getCategoryTemplate() {
      return '<li class="gdpr-cookie-notice-modal-cookie">\n    <div class="gdpr-cookie-notice-modal-cookie-row">\n      <h3 class="gdpr-cookie-notice-modal-cookie-title">{{title}}</h3>\n      <input type="checkbox" name="gdpr-cookie-notice-{{prefix}}" id="gdpr-cookie-notice-{{prefix}}" class="gdpr-cookie-notice-modal-cookie-input" {{checked}}>\n      <label class="gdpr-cookie-notice-modal-cookie-input-switch" for="gdpr-cookie-notice-{{prefix}}"></label>\n    </div>\n    <p class="gdpr-cookie-notice-modal-cookie-info">{{desc}}</p>\n    </li>';
    }

    //string, object

  }, {
    key: 'getTemplateHtml',
    value: function getTemplateHtml(template, data) {
      if (typeof template === 'string' && data instanceof Object) {
        return template.replace(/{{([^}]+)}}/g, function (i, j) {
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
  }]);

  return _class;
}();

/* harmony default export */ __webpack_exports__["default"] = (_class);

/***/ }),

/***/ "./src/GdprCookieNotice2.js":
/*!**********************************!*\
  !*** ./src/GdprCookieNotice2.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_variables_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/_variables.scss */ "./src/sass/_variables.scss");
/* harmony import */ var _sass_variables_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_variables_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sass_notice2_notice2_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sass/notice2/_notice2.scss */ "./src/sass/notice2/_notice2.scss");
/* harmony import */ var _sass_notice2_notice2_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sass_notice2_notice2_scss__WEBPACK_IMPORTED_MODULE_1__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var _class = function () {
  function _class(gdprCookieManager) {
    _classCallCheck(this, _class);

    this._isNoticeLoaded = false;
    this._timeout = 500;
    this._pluginPrefix = 'gdpr-cookie-notice';
    this._locale = {
      description: 'Ez a weboldal s\xFCtiket(cookie-kat) haszn\xE1l az\xE9rt, hogy a weboldal m\u0171k\xF6dj\xF6n, statisztikai adatokat \n      gy\u0171jts\xF6n \xE9s jobb felhaszn\xE1li\xF3 \xE9lm\xE9nyt ny\xFAjtson. A S\xFCti be\xE1ll\xEDt\xE1sok gombra kattintva t\xF6bb inform\xE1ci\xF3t is megtudhat \n      err\u0151l. Az oldal tov\xE1bbi haszn\xE1lat\xE1val beleegyezik a s\xFCtik haszn\xE1lat\xE1ba.',
      accept: 'Elfogadom',
      settings: 'Süti beállítások'
    };
    this._manager = gdprCookieManager;
  }

  /*
   * @param Object locale
   */


  _createClass(_class, [{
    key: 'setLocale',
    value: function setLocale(locale) {
      this._locale = locale;
    }
  }, {
    key: 'show',
    value: function show() {
      var _this = this;

      console.log('show');
      this.build();

      // Show the notice with a little timeout
      window.setTimeout(function () {
        document.documentElement.classList.add(_this._pluginPrefix + '-loaded');
      }, this._timeout);
    }
  }, {
    key: 'build',
    value: function build() {
      var _this2 = this;

      if (this._isNoticeLoaded) {
        return;
      }
      document.body.insertAdjacentHTML('beforeend', this.getTemplateHtml(this._getTemplate(), this._locale));
      var settingsButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-settings')[0];
      var acceptButton = document.querySelectorAll('.' + this._pluginPrefix + '-nav-item-accept')[0];

      settingsButton.addEventListener('click', function (e) {
        e.preventDefault();
        _this2._manager.setEvent('show_modal');
      });

      acceptButton.addEventListener('click', function (e) {
        e.preventDefault();
        _this2._manager.setEvent('accept_all_category');
      });

      this._isNoticeLoaded = true;
    }
  }, {
    key: 'hide',
    value: function hide() {
      document.documentElement.classList.remove(this._pluginPrefix + '-loaded');
    }
  }, {
    key: '_getTemplate',
    value: function _getTemplate() {
      return '<div class="gdpr-cookie-notice">\n    <p class="gdpr-cookie-notice-description">{{description}}</p>\n    <nav class="gdpr-cookie-notice-nav">\n      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{{settings}}</a>\n      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{{accept}}</a>\n    </nav>\n    </div>';
    }

    //string, object

  }, {
    key: 'getTemplateHtml',
    value: function getTemplateHtml(template, data) {
      if (typeof template === 'string' && data instanceof Object) {
        return template.replace(/{{([^}]+)}}/g, function (i, j) {
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
  }]);

  return _class;
}();

/* harmony default export */ __webpack_exports__["default"] = (_class);

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
/* harmony import */ var _GdprCookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GdprCookie */ "./src/GdprCookie.js");
/* harmony import */ var _GdprCookieNotice2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GdprCookieNotice2 */ "./src/GdprCookieNotice2.js");
/* harmony import */ var _GdprCookieModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GdprCookieModal */ "./src/GdprCookieModal.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// import './sass/gdpr-cookie-notice.scss'




// GdprCookieNotice =======================================================

var GdprCookieNotice = function () {
  function GdprCookieNotice(options) {
    var _this = this;

    _classCallCheck(this, GdprCookieNotice);

    console.log('GdprCookieNotice:constructor');
    this._categories = options.categories ? options.categories : [];
    // this._implicit = options.implicit ? options.implicit : false
    // this._cookiesAccepted = false
    //COOKIE
    this._namespace = options.namespace ? options.namespace : 'gdprcookienotice';
    this._expiration = options.expiration ? options.expiration : 30;
    this._domain = options.domain ? options.domain : window.location.hostname;
    this._gdprCookie = new _GdprCookie__WEBPACK_IMPORTED_MODULE_2__["default"](this._namespace, this._expiration, this._domain);

    //BOXES
    this._pluginPrefix = options.pluginPrefix ? options.pluginPrefix : 'gdpr-cookie-notice';
    this._locale = options.locale ? options.locale : 'hu';
    //NOTICE
    this._timeout = options.timeout ? options.timeout : 500;
    this._statementUrl = options.statementUrl ? options.statementUrl : '';
    this._notice = new _GdprCookieNotice2__WEBPACK_IMPORTED_MODULE_3__["default"](this);
    //MODAL
    this._isCategoriesCheckedByDefault = options.categoriesCheckedByDefault ? options.categoriesCheckedByDefault : false;
    this._modal = new _GdprCookieModal__WEBPACK_IMPORTED_MODULE_4__["default"](this);

    if (!this._gdprCookie.isExists()) {
      this._notice.show();

      // if (this._implicit) {
      //   this.acceptOnScroll()
      // }
    } else {
      //   this.deleteCookies(this.getCurrentCookieSelection())
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() });
      document.dispatchEvent(this._gdprCookiesEnabledEvt);
    }

    // Settings button on the page somewhere
    var globalSettingsButtons = document.querySelectorAll('.' + this._pluginPrefix + '-settings-button');

    if (globalSettingsButtons) {
      for (var i in globalSettingsButtons) {
        console.log(i, globalSettingsButtons[i]);
        globalSettingsButtons[i].addEventListener('click', function (e) {
          e.preventDefault();
          _this._modal.show();
        });
      }
    }
  }

  _createClass(GdprCookieNotice, [{
    key: 'setEvent',
    value: function setEvent(evt, data) {
      switch (evt) {
        case 'accept_all_category':
          this.acceptAllCategories();
          break;

        case 'accept_categories':
          this.acceptCategories(data.performance, data.analytics, data.marketing);
          break;

        case 'show_modal':
          this._modal.show();
          break;

        default:
          throw new Error('Event type not supported');
      }
    }
  }, {
    key: 'acceptAllCategories',
    value: function acceptAllCategories() {
      this.acceptCategories(!!this._categories.performance, !!this._categories.analytics, !!this._categories.marketing);
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
    value: function acceptCategories(isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted) {
      console.log('acceptCategories', isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);
      // Load marketing scripts that only works when cookies are accepted
      this._gdprCookie.set(true, isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);
      this._gdprCookiesEnabledEvt = new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() });
      document.dispatchEvent(this._gdprCookiesEnabledEvt);

      if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
        this._notice.hide();
      } else {
        this._notice.show();
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

    // set implicit (isImplicit) {
    //   this._implicit = isImplicit
    // }
    //
    // get implicit () {
    //   return this._implicit
    // }

    // set cookiesAccepted (isAccepted) {
    //   this._cookiesAccepted = isAccepted
    // }
    //
    // get cookiesAccepted () {
    //   return this._cookiesAccepted
    // }

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
  modal: {
    settings: 'Süti beállítások',
    statement: 'Süti nyilatkozatunk',
    save: 'Mentés'
  },
  bar: {
    description: 'Ez a weboldal s\xFCtiket(cookie-kat) haszn\xE1l az\xE9rt, hogy a weboldal m\u0171k\xF6dj\xF6n, statisztikai adatokat \n    gy\u0171jts\xF6n \xE9s jobb felhaszn\xE1li\xF3 \xE9lm\xE9nyt ny\xFAjtson. A S\xFCti be\xE1ll\xEDt\xE1sok gombra kattintva t\xF6bb inform\xE1ci\xF3t is megtudhat \n    err\u0151l. Az oldal tov\xE1bbi haszn\xE1lat\xE1val beleegyezik a s\xFCtik haszn\xE1lat\xE1ba.',
    accept: 'Elfogadom',
    settings: 'Süti beállítások'
  },
  category: {
    essential: {
      title: 'Szükséges sütik',
      desc: 'Ezek a weboldal megfelelő megjelenéséhez szükséges sütik, amelyek nélkül nem működne a weboldal.',
      always_on: 'Mindig betölt'
    },
    performance: {
      title: 'Teljesítmény sütik',
      desc: 'Ezek a s\xFCtik kieg\xE9sz\xEDt\u0151 funkci\xF3kat t\xE1mogatnak az oldalon, p\xE9ld\xE1ul elt\xE1rolja, hogy milyen nyelven b\xF6ng\xE9szi \n      a weboldalt. Ezek n\xE9lk\xFCl nem biztos, hogy minden megfelel\u0151en fog m\u0171k\xF6dni.'
    },
    analytics: {
      title: 'Statisztika sütik',
      desc: 'Ezeket az\xE9rt haszn\xE1ljuk, hogy t\xE1j\xE9koz\xF3dni tudjunk arr\xF3l, mikor, h\xE1nyan \xE9s hogyan haszn\xE1lj\xE1k a \n      weboldalunkat. Ezekkel az adatokkal tudjuk k\xE9s\u0151bb optimaliz\xE1lni a weboldalunkat a megfelel\u0151 felhaszn\xE1l\xF3i \n      \xE9lm\xE9ny\xE9rt.'
    },
    marketing: {
      title: 'Marketing sütik',
      desc: 'Ezek a sütik segítenek nekünk a hirdetések kezelésében, célzásában.'
    }
  }
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

/***/ "./src/sass/_variables.scss":
/*!**********************************!*\
  !*** ./src/sass/_variables.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/sass/modal/_modal.scss":
/*!************************************!*\
  !*** ./src/sass/modal/_modal.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):\n\r\n    background: url($icon_caret);\r\n                   ^\r\n      Undefined variable: \"$icon-caret\".\r\n      in C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\src\\sass\\modal\\_modal.scss (line 8, column 21)\n    at runLoaders (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\webpack\\lib\\NormalModule.js:286:20)\n    at C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\loader-runner\\lib\\LoaderRunner.js:230:18\n    at context.callback (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\loader-runner\\lib\\LoaderRunner.js:111:13)\n    at Object.render [as callback] (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\sass-loader\\lib\\loader.js:52:13)\n    at Object.done [as callback] (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\neo-async\\async.js:7974:18)\n    at options.error (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\node-sass\\lib\\index.js:294:32)");

/***/ }),

/***/ "./src/sass/notice2/_notice2.scss":
/*!****************************************!*\
  !*** ./src/sass/notice2/_notice2.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):\n\r\n  background: $bar_bg;\r\n             ^\r\n      Undefined variable: \"$bar-bg\".\r\n      in C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\src\\sass\\notice2\\_notice2.scss (line 3, column 15)\n    at runLoaders (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\webpack\\lib\\NormalModule.js:286:20)\n    at C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\loader-runner\\lib\\LoaderRunner.js:364:11\n    at C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\loader-runner\\lib\\LoaderRunner.js:230:18\n    at context.callback (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\loader-runner\\lib\\LoaderRunner.js:111:13)\n    at Object.render [as callback] (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\sass-loader\\lib\\loader.js:52:13)\n    at Object.done [as callback] (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\neo-async\\async.js:7974:18)\n    at options.error (C:\\Users\\beck.andras\\projects\\php\\src\\gdpr-cookie-notice\\node_modules\\node-sass\\lib\\index.js:294:32)");

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
  bar: "<div class=\"gdpr-cookie-notice\">\n    <p class=\"gdpr-cookie-notice-description\">{{description}}</p>\n    <nav class=\"gdpr-cookie-notice-nav\">\n      <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings\">{{settings}}</a>\n      <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn\">{{accept}}</a>\n    </nav>\n  </div>",
  category: "<li class=\"gdpr-cookie-notice-modal-cookie\">\n    <div class=\"gdpr-cookie-notice-modal-cookie-row\">\n      <h3 class=\"gdpr-cookie-notice-modal-cookie-title\">{{title}}</h3>\n      <input type=\"checkbox\" name=\"gdpr-cookie-notice-{{prefix}}\" id=\"gdpr-cookie-notice-{{prefix}}\" class=\"gdpr-cookie-notice-modal-cookie-input\" {{checked}}>\n      <label class=\"gdpr-cookie-notice-modal-cookie-input-switch\" for=\"gdpr-cookie-notice-{{prefix}}\"></label>\n    </div>\n    <p class=\"gdpr-cookie-notice-modal-cookie-info\">{{desc}}</p>\n  </li>",
  modal: "<div class=\"gdpr-cookie-notice-modal\">\n    <div class=\"gdpr-cookie-notice-modal-content\">\n      <div class=\"gdpr-cookie-notice-modal-header\">\n        <h2 class=\"gdpr-cookie-notice-modal-title\">{{settings}}</h2>\n        <button type=\"button\" class=\"gdpr-cookie-notice-modal-close\"></button>\n      </div>\n      <ul class=\"gdpr-cookie-notice-modal-cookies\"></ul>\n      <div class=\"gdpr-cookie-notice-modal-footer\">\n        <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement\">{{statement}}</a>\n        <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn\">\n            <span>{{save}}</span>\n        </a>\n      </div>\n    </div>\n  </div>"
});

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=gdpr-cookie-notice.js.map