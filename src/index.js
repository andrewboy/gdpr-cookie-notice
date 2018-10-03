// import './sass/gdpr-cookie-notice.scss'
// import "sass/modal/_variables.scss";
// import "sass/notice2/_variables.scss";

import GdprCookie from './GdprCookie'
import GdprCookieNoticePopup from './GdprCookieNoticePopup'
import GdprCookieModal from './GdprCookieModal'
import { default as GdprCookieNotice } from './GdprCookieNoticeManager'

// export { GdprCookieNotice, GdprCookie, GdprCookieNoticePopup, GdprCookieModal }
// export default GdprCookieNotice

module.exports = {
  GdprCookie,
  GdprCookieNoticePopup,
  GdprCookieModal,
  GdprCookieNotice
}