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
      return !!js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name)['necessary'];
    }
  }, {
    key: 'isAnalyticsAccepted',
    value: function isAnalyticsAccepted() {
      return !!js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name)['analytics'];
    }
  }, {
    key: 'isPerformanceAccepted',
    value: function isPerformanceAccepted() {
      return !!js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name)['performance'];
    }
  }, {
    key: 'isMarketingAccepted',
    value: function isMarketingAccepted() {
      return !!js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.getJSON(this._name)['marketing'];
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
/* harmony import */ var _locales_en_GB_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locales/en_GB.js */ "./src/locales/en_GB.js");
/* harmony import */ var _sass_modal_variables_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sass/modal/_variables.scss */ "./src/sass/modal/_variables.scss");
/* harmony import */ var _sass_modal_variables_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sass_modal_variables_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sass_modal_modal_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sass/modal/_modal.scss */ "./src/sass/modal/_modal.scss");
/* harmony import */ var _sass_modal_modal_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sass_modal_modal_scss__WEBPACK_IMPORTED_MODULE_2__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var _class = function () {
  function _class(cookieManager, prefix, locale, statementUrl, isCheckedByDefault) {
    _classCallCheck(this, _class);

    this._manager = cookieManager;
    this._locale = locale ? locale : _locales_en_GB_js__WEBPACK_IMPORTED_MODULE_0__["default"]['modal'];
    this._pluginPrefix = prefix ? prefix : 'gdpr-cookie-notice';
    this._isCategoriesCheckedByDefault = isCheckedByDefault ? isCheckedByDefault : false;
    this._statementUrl = statementUrl ? statementUrl : '';
    this._isModalLoaded = false;
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
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._isModalLoaded) {
        document.getElementsByClassName(this._pluginPrefix + '-modal')[0].remove();
      }
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
        e.preventDefault();
        _this.hide();
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

/***/ "./src/GdprCookieNoticeManager.js":
/*!****************************************!*\
  !*** ./src/GdprCookieNoticeManager.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GdprCookieModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GdprCookieModal */ "./src/GdprCookieModal.js");
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locales */ "./src/locales/index.js");
/* harmony import */ var _GdprCookieNoticePopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GdprCookieNoticePopup */ "./src/GdprCookieNoticePopup.js");
/* harmony import */ var _GdprCookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GdprCookie */ "./src/GdprCookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_4__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var _class = function () {
  function _class(options) {
    _classCallCheck(this, _class);

    console.log('GdprCookieNotice:constructor');
    this._opts = {
      categories: {},
      acceptOnScroll: false,
      //cookie
      namespace: 'gdprcookienotice',
      expiration: 30,
      domain: window.location.hostname,
      //boxes
      pluginPrefix: 'gdpr-cookie-notice',
      locale: 'en_GB',
      //notice
      timeout: 500,
      statementUrl: '',
      //modal
      isCategoriesAcceptedByDefault: false
    };
    this._isCookiesAccepted = false;
    this.load(options);
  }

  _createClass(_class, [{
    key: '_getNotice',
    value: function _getNotice() {
      return new _GdprCookieNoticePopup__WEBPACK_IMPORTED_MODULE_2__["default"](this, this._opts.pluginPrefix, _locales__WEBPACK_IMPORTED_MODULE_1__[this._opts.locale]['notice'], this._opts.timeout);
    }
  }, {
    key: '_getModal',
    value: function _getModal() {
      return new _GdprCookieModal__WEBPACK_IMPORTED_MODULE_0__["default"](this, this._opts.pluginPrefix, _locales__WEBPACK_IMPORTED_MODULE_1__[this._opts.locale]['modal'], this._opts.statementUrl, this._opts.isCategoriesCheckedByDefault);
    }
  }, {
    key: 'load',
    value: function load(options) {
      //remove actual
      this.destroy();

      //reset options
      this._opts = Object.assign({}, this._opts, options);

      //cookie
      this._gdprCookie = new _GdprCookie__WEBPACK_IMPORTED_MODULE_3__["default"](this._opts.namespace, this._opts.expiration, this._opts.domain);
      //notice
      this._notice = this._getNotice();
      //modal
      this._modal = this._getModal();

      if (!this._gdprCookie.isExists()) {
        console.log('cookie not set');
        this._notice.show();

        if (this._opts.acceptOnScroll) {
          this._acceptOnScroll();
        }
      } else {
        console.log('cookie SET');
        this._deleteUnacceptableCookies();
        this._fireCookieEnvabledEvent();
      }

      this._setModalShowButton();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._notice) {
        this._notice.destroy();
      }

      if (this._modal) {
        this._modal.destroy();
      }
    }

    //acceptonscroll =========

  }, {
    key: '_acceptOnScroll',
    value: function _acceptOnScroll() {
      window.addEventListener('scroll', function _listener() {
        console.log(this);
        if (this._amountScrolled()) {
          console.log('accepted on scroll');
          this.acceptAllCategories();
          window.removeEventListener('scroll', _listener);
        }
      }.bind(this));
    }
  }, {
    key: '_amountScrolled',
    value: function _amountScrolled() {
      console.log('_amountScrolled');
      var windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
      var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
      var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var trackLength = documentHeight - windowHeight;
      var pctScrolled = Math.floor(scrollTop / trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
      if (pctScrolled > 25 && !this._isCookiesAccepted) {
        this._isCookiesAccepted = true;
        return true;
      } else {
        return false;
      }
    }

    //==============

  }, {
    key: '_setModalShowButton',
    value: function _setModalShowButton() {
      var _this = this;

      var globalSettingsButtons = document.querySelectorAll('.' + this._opts.pluginPrefix + '-settings-button');

      console.log(globalSettingsButtons);

      if (globalSettingsButtons) {
        for (var i = 0; i < globalSettingsButtons.length; i++) {
          console.log('globalSettingsButtons LOOP', i, globalSettingsButtons[i]);
          globalSettingsButtons[i].addEventListener('click', function (e) {
            e.preventDefault();
            _this._modal.show();
          });
        }
      }
    }
  }, {
    key: '_fireCookieEnvabledEvent',
    value: function _fireCookieEnvabledEvent() {
      document.dispatchEvent(new CustomEvent('gdprCookiesEnabled', { detail: this._gdprCookie.get() }));
    }
  }, {
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
      this.acceptCategories(!!this._opts.categories.performance, !!this._opts.categories.analytics, !!this._opts.categories.marketing);
    }

    //COOKIE =============================================================================================================

  }, {
    key: 'acceptCategories',
    value: function acceptCategories(isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted) {
      console.log('acceptCategories', isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);
      // Load marketing scripts that only works when cookies are accepted
      this._gdprCookie.set(true, isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted);

      this._deleteUnacceptableCookies();

      this._fireCookieEnvabledEvent();

      if (this._gdprCookie.isExists() && this._gdprCookie.isNecessaryAccepted()) {
        this._notice.hide();
      } else {
        this._notice.show();
      }
    }
  }, {
    key: '_deleteUnacceptableCookies',
    value: function _deleteUnacceptableCookies() {
      if (!this._gdprCookie.isExists()) {
        return;
      }

      //analytics
      if (!!this._opts.categories.analytics && !this._gdprCookie.isAnalyticsAccepted()) {
        for (var i in this._opts.categories.analytics) {
          js_cookie__WEBPACK_IMPORTED_MODULE_4___default.a.remove(this._opts.categories.analytics[i]);
        }
      }

      //performance
      if (!!this._opts.categories.performance && !this._gdprCookie.isPerformanceAccepted()) {
        for (var _i in this._opts.categories.performance) {
          js_cookie__WEBPACK_IMPORTED_MODULE_4___default.a.remove(this._opts.categories.performance[_i]);
        }
      }

      //marketing
      if (!!this._opts.categories.marketing && !this._gdprCookie.isMarketingAccepted()) {
        for (var _i2 in this._opts.categories.marketing) {
          js_cookie__WEBPACK_IMPORTED_MODULE_4___default.a.remove(this._opts.categories.marketing[_i2]);
        }
      }
    }

    //=================================

  }, {
    key: 'categories',
    get: function get() {
      return this._opts.categories;
    }
  }]);

  return _class;
}();

/* harmony default export */ __webpack_exports__["default"] = (_class);

/***/ }),

/***/ "./src/GdprCookieNoticePopup.js":
/*!**************************************!*\
  !*** ./src/GdprCookieNoticePopup.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _locales_en_GB_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locales/en_GB.js */ "./src/locales/en_GB.js");
/* harmony import */ var _sass_notice2_variables_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sass/notice2/_variables.scss */ "./src/sass/notice2/_variables.scss");
/* harmony import */ var _sass_notice2_variables_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sass_notice2_variables_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sass_notice2_notice2_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sass/notice2/_notice2.scss */ "./src/sass/notice2/_notice2.scss");
/* harmony import */ var _sass_notice2_notice2_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sass_notice2_notice2_scss__WEBPACK_IMPORTED_MODULE_2__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var _class = function () {
  function _class(cookieManager, prefix, locale, timeout) {
    _classCallCheck(this, _class);

    // constructor (opts) {
    //   this._isNoticeLoaded = false
    //   this._timeout = opts.timeout ? opts.timeout : 500
    //   this._pluginPrefix = opts.pluginPrefix ? opts.pluginPrefix : 'gdpr-cookie-notice'
    //   this._locale = opts.locale ? opts.locale : en_GB['notice']
    //   this._manager = opts.cookieManager
    this._manager = cookieManager;
    this._isNoticeLoaded = false;
    this._timeout = timeout ? timeout : 500;
    this._pluginPrefix = prefix ? prefix : 'gdpr-cookie-notice';
    this._locale = locale ? locale : _locales_en_GB_js__WEBPACK_IMPORTED_MODULE_0__["default"]['notice'];
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
      this._build();

      // Show the notice with a little timeout
      window.setTimeout(function () {
        document.documentElement.classList.add(_this._pluginPrefix + '-loaded');
      }, this._timeout);
    }
  }, {
    key: '_build',
    value: function _build() {
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
    key: 'destroy',
    value: function destroy() {
      document.getElementsByClassName(this._pluginPrefix)[0].remove();
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
/*! exports provided: default, GdprCookieNotice, GdprCookie, GdprCookieNoticePopup, GdprCookieModal, GdprCookieNoticeManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GdprCookieNotice", function() { return GdprCookieNotice; });
/* harmony import */ var _GdprCookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GdprCookie */ "./src/GdprCookie.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GdprCookie", function() { return _GdprCookie__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _GdprCookieNoticePopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GdprCookieNoticePopup */ "./src/GdprCookieNoticePopup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GdprCookieNoticePopup", function() { return _GdprCookieNoticePopup__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _GdprCookieModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GdprCookieModal */ "./src/GdprCookieModal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GdprCookieModal", function() { return _GdprCookieModal__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _GdprCookieNoticeManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GdprCookieNoticeManager */ "./src/GdprCookieNoticeManager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GdprCookieNoticeManager", function() { return _GdprCookieNoticeManager__WEBPACK_IMPORTED_MODULE_3__["default"]; });

// import './sass/gdpr-cookie-notice.scss'
// import "sass/modal/_variables.scss";
// import "sass/notice2/_variables.scss";






var GdprCookieNotice = {
  GdprCookie: _GdprCookie__WEBPACK_IMPORTED_MODULE_0__["default"],
  GdprCookieNoticePopup: _GdprCookieNoticePopup__WEBPACK_IMPORTED_MODULE_1__["default"],
  GdprCookieModal: _GdprCookieModal__WEBPACK_IMPORTED_MODULE_2__["default"],
  GdprCookieNoticeManager: _GdprCookieNoticeManager__WEBPACK_IMPORTED_MODULE_3__["default"]
};

/* harmony default export */ __webpack_exports__["default"] = (GdprCookieNotice);



/***/ }),

/***/ "./src/locales/da_DK.js":
/*!******************************!*\
  !*** ./src/locales/da_DK.js ***!
  \******************************/
/*! exports provided: da_DK, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "da_DK", function() { return da_DK; });
var da_DK = {
  modal: {
    modal: {
      settings: 'Cookie Indstillinger',
      statement: 'Vores cookie politik',
      save: 'Gem indstillinger'
    },
    category: {
      essential: {
        title: 'Nødvendige cookies',
        desc: 'N\xF8dvendige cookies g\xF8r websitet brugbart og s\xF8rger for basale funktioner som navigation og adgang til \n        l\xE5ste sektioner p\xE5 sitet. Websitet fungerer ikke uden disse cookies.',
        always_on: 'Altid aktiveret'
      },
      performance: {
        title: 'Præference cookies',
        desc: 'Disse cookies bruges til at forbedre oplevelsen og funktionaliteten men er ikke essentielle. For \n        eksempel kan de gemme dit foretrukne sprog og/eller hvilken region du er i.'
      },
      analytics: {
        title: 'Analytics cookies',
        desc: 'Vi bruger analytics cookies til at m\xE5le hvordan websitets indhold bruges, hvilket hj\xE6lper os med at \n        skr\xE6ddersy websitet til dig s\xE5 du f\xE5r den bedste oplevelse.'
      },
      marketing: {
        title: 'Marketing cookies',
        desc: 'Disse cookies bruges til at g\xF8re reklamer mere relevante for dig. Det er meningen at de reklamer der \n        vises er relevante for den individuelle bruger og derved mere v\xE6rdifulde for udbydere og tredjeparts \n        annonc\xF8rer.'
      }
    }
  },
  notice: {
    description: 'Vi bruger cookies til at forbedre din oplevelse p\xE5 siden, personalisere indhold og reklamer, til \n    sociale mediers funktioner og til at analysere vores trafik. L\xE6s om vores cookies og om hvordan du kan frav\xE6lge \n    dem ved at klikke p\xE5 Cookie Indstillinger. Du accepterer vores cookies hvis du forts\xE6tter med at bruge vores site.',
    accept: 'Accepter cookies',
    settings: 'Cookie Indstillinger'
  }
};


/* harmony default export */ __webpack_exports__["default"] = (da_DK);

/***/ }),

/***/ "./src/locales/en_GB.js":
/*!******************************!*\
  !*** ./src/locales/en_GB.js ***!
  \******************************/
/*! exports provided: en_GB, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "en_GB", function() { return en_GB; });
var en_GB = {
  modal: {
    modal: {
      settings: 'Cookie settings',
      statement: 'Our cookie statement',
      save: 'Save settings'
    },
    category: {
      essential: {
        title: 'Essential website cookies',
        desc: 'Necessary cookies help make a website usable by enabling basic functions like page navigation and \n        access to secure areas of the website. The website cannot function properly without these cookies.',
        always_on: 'Always on'
      },
      performance: {
        title: 'Performance cookies',
        desc: 'These cookies are used to enhance the performance and functionality of our websites but are \n        non-essential to their use. For example it stores your preferred language or the region that you are in.'
      },
      analytics: {
        title: 'Analytics cookies',
        desc: 'We use analytics cookies to help us measure how users interact with website content, which helps us \n        customize our websites and application for you in order to enhance your experience.'
      },
      marketing: {
        title: 'Marketing cookies',
        desc: 'These cookies are used to make advertising messages more relevant to you and your interests. The \n        intention is to display ads that are relevant and engaging for the individual user and thereby more valuable \n        for publishers and third party advertisers.'
      }
    }
  },
  notice: {
    description: 'We use cookies to offer you a better browsing experience, personalise content and ads, to provide \n    social media features and to analyse our traffic. Read about how we use cookies and how you can control them by \n    clicking Cookie Settings. You consent to our cookies if you continue to use this website.',
    accept: 'Accept cookies',
    settings: 'Cookie settings'
  }
};


/* harmony default export */ __webpack_exports__["default"] = (en_GB);

/***/ }),

/***/ "./src/locales/hu_HU.js":
/*!******************************!*\
  !*** ./src/locales/hu_HU.js ***!
  \******************************/
/*! exports provided: hu_HU, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hu_HU", function() { return hu_HU; });
var hu_HU = {
  modal: {
    modal: {
      settings: 'Süti beállítások',
      statement: 'Süti nyilatkozatunk',
      save: 'Mentés'
    },
    category: {
      essential: {
        title: 'Szükséges sütik',
        desc: 'Ezek a weboldal megfelel\u0151 megjelen\xE9s\xE9hez sz\xFCks\xE9ges s\xFCtik, amelyek n\xE9lk\xFCl nem m\u0171k\xF6dne a weboldal.',
        always_on: 'Mindig betölt'
      },
      performance: {
        title: 'Teljesítmény sütik',
        desc: 'Ezek a s\xFCtik kieg\xE9sz\xEDt\u0151 funkci\xF3kat t\xE1mogatnak az oldalon, p\xE9ld\xE1ul elt\xE1rolja, hogy milyen nyelven b\xF6ng\xE9szi \n        a weboldalt. Ezek n\xE9lk\xFCl nem biztos, hogy minden megfelel\u0151en fog m\u0171k\xF6dni.'
      },
      analytics: {
        title: 'Statisztika sütik',
        desc: 'Ezeket az\xE9rt haszn\xE1ljuk, hogy t\xE1j\xE9koz\xF3dni tudjunk arr\xF3l, mikor, h\xE1nyan \xE9s hogyan haszn\xE1lj\xE1k a \n        weboldalunkat. Ezekkel az adatokkal tudjuk k\xE9s\u0151bb optimaliz\xE1lni a weboldalunkat a megfelel\u0151 felhaszn\xE1l\xF3i \n        \xE9lm\xE9ny\xE9rt.'
      },
      marketing: {
        title: 'Marketing sütik',
        desc: 'Ezek a s\xFCtik seg\xEDtenek nek\xFCnk a hirdet\xE9sek kezel\xE9s\xE9ben, c\xE9lz\xE1s\xE1ban.'
      }
    }
  },
  notice: {
    description: 'Ez a weboldal s\xFCtiket(cookie-kat) haszn\xE1l az\xE9rt, hogy a weboldal m\u0171k\xF6dj\xF6n, statisztikai adatokat \n    gy\u0171jts\xF6n \xE9s jobb felhaszn\xE1li\xF3 \xE9lm\xE9nyt ny\xFAjtson. A S\xFCti be\xE1ll\xEDt\xE1sok gombra kattintva t\xF6bb inform\xE1ci\xF3t is megtudhat \n    err\u0151l. Az oldal tov\xE1bbi haszn\xE1lat\xE1val beleegyezik a s\xFCtik haszn\xE1lat\xE1ba.',
    accept: 'Elfogadom',
    settings: 'Süti beállítások'
  }
};


/* harmony default export */ __webpack_exports__["default"] = (hu_HU);

/***/ }),

/***/ "./src/locales/index.js":
/*!******************************!*\
  !*** ./src/locales/index.js ***!
  \******************************/
/*! exports provided: hu_HU, en_GB, nl_NL, da_DK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hu_HU__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hu_HU */ "./src/locales/hu_HU.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hu_HU", function() { return _hu_HU__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _en_GB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./en_GB */ "./src/locales/en_GB.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "en_GB", function() { return _en_GB__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _nl_NL__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nl_NL */ "./src/locales/nl_NL.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nl_NL", function() { return _nl_NL__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _da_DK__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./da_DK */ "./src/locales/da_DK.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "da_DK", function() { return _da_DK__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./src/locales/nl_NL.js":
/*!******************************!*\
  !*** ./src/locales/nl_NL.js ***!
  \******************************/
/*! exports provided: nl_NL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nl_NL", function() { return nl_NL; });
var nl_NL = {
  modal: {
    modal: {
      settings: 'Cookie instellingen',
      statement: 'Onze cookie verklaring',
      save: 'Bewaar instellingen'
    },
    category: {
      essential: {
        title: 'Essentiële cookies',
        desc: 'Essenti\xEBle (noodzakelijke) cookies helpen een website bruikbaar te maken door basisfuncties zoals \n        paginanavigatie en toegang tot beveiligde delen van de website in te schakelen. De website kan niet goed \n        functioneren zonder deze cookies.',
        always_on: 'Altijd aan'
      },
      performance: {
        title: 'Prestatie cookies',
        desc: 'Deze cookies worden gebruikt om de prestaties en functionaliteit van onze websites te verbeteren, maar \n        zijn niet essentieel voor gebruik. Het slaat bijvoorbeeld de taal van uw voorkeur op of de regio waarin u zich \n        bevindt.'
      },
      analytics: {
        title: 'Analytische cookies',
        desc: 'We gebruiken analytische cookies om te meten hoe gebruikers omgaan met website en inhoud, waardoor we \n        onze websites en applicaties voor u kunnen aanpassen om uw ervaring te verbeteren.'
      },
      marketing: {
        title: 'Marketing cookies',
        desc: 'Deze cookies worden gebruikt om advertenties te kunnen tonen die aansluit bij uw interesses. Het is de \n        bedoeling advertenties weer te geven die relevant en aantrekkelijk zijn voor de individuele gebruiker en \n        daardoor waardevoller voor uitgevers en externe adverteerders.'
      }
    }
  },
  notice: {
    description: 'Wij gebruiken cookies om u deze website optimaal te kunnen gebruiken, inhoud en advertenties te \n    personaliseren, social media-functies te bieden en ons verkeer te analyseren. Lees meer over hoe wij cookies \n    gebruiken en hoe u ze kunt beheren door op Cookie instellingen te klikken. U gaat akkoord met onze cookies als u \n    deze website blijft gebruiken.',
    accept: 'Accepteer cookies',
    settings: 'Cookie instellingen'
  }
};


/* harmony default export */ __webpack_exports__["default"] = (nl_NL);

/***/ }),

/***/ "./src/sass/modal/_modal.scss":
/*!************************************!*\
  !*** ./src/sass/modal/_modal.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/sass/modal/_variables.scss":
/*!****************************************!*\
  !*** ./src/sass/modal/_variables.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/sass/notice2/_notice2.scss":
/*!****************************************!*\
  !*** ./src/sass/notice2/_notice2.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/sass/notice2/_variables.scss":
/*!******************************************!*\
  !*** ./src/sass/notice2/_variables.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=gdpr-cookie-notice.js.map