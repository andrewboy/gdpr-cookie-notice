import Cookies from 'js-cookie'

export default class {
  constructor (name, expiration, domain) {
    this._name = name
    this._expiration = expiration
    this._domain = domain
  }

  isExists () {
    return !!Cookies.getJSON(this._name)
  }

  set (isNecessaryAccepted, isPerformanceAccepted, isAnalyticsAccepted, isMarketingAccepted) {
    let value = {
      date: new Date(),
      necessary: isNecessaryAccepted,
      performance: isPerformanceAccepted,
      analytics: isAnalyticsAccepted,
      marketing: isMarketingAccepted
    }

    Cookies.set(this._name, value, {expires: this._expiration, domain: this._domain})
  }

  isNecessaryAccepted () {
    return !!Cookies.getJSON(this._name)['necessary']
  }

  isAnalyticsAccepted () {
    return !!Cookies.getJSON(this._name)['analytics']
  }

  isPerformanceAccepted () {
    return !!Cookies.getJSON(this._name)['performance']
  }

  isMarketingAccepted () {
    return !!Cookies.getJSON(this._name)['marketing']
  }

  get () {
    return Cookies.getJSON(this._name)
  }

  // delete () {
  //
  // }
}