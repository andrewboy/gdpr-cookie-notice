'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      return !!_jsCookie2.default.getJSON(this._name);
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

      _jsCookie2.default.set(this._name, value, { expires: this._expiration, domain: this._domain });
    }
  }, {
    key: 'isNecessaryAccepted',
    value: function isNecessaryAccepted() {
      return !!_jsCookie2.default.getJSON(this._name)['necessary'];
    }
  }, {
    key: 'isAnalyticsAccepted',
    value: function isAnalyticsAccepted() {
      return !!_jsCookie2.default.getJSON(this._name)['analytics'];
    }
  }, {
    key: 'isPerformanceAccepted',
    value: function isPerformanceAccepted() {
      return !!_jsCookie2.default.getJSON(this._name)['performance'];
    }
  }, {
    key: 'isMarketingAccepted',
    value: function isMarketingAccepted() {
      return !!_jsCookie2.default.getJSON(this._name)['marketing'];
    }
  }, {
    key: 'get',
    value: function get() {
      return _jsCookie2.default.getJSON(this._name);
    }

    // delete () {
    //
    // }

  }]);

  return _class;
}();

exports.default = _class;
//# sourceMappingURL=GdprCookie.js.map