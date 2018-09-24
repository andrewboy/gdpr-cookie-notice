export default {
  bar: `<div class="gdpr-cookie-notice">
    <p class="gdpr-cookie-notice-description">{{description}}</p>
    <nav class="gdpr-cookie-notice-nav">
      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{{settings}}</a>
      <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{{accept}}</a>
    </div>
  </div>`,
  category: `<li class="gdpr-cookie-notice-modal-cookie">
    <div class="gdpr-cookie-notice-modal-cookie-row">
      <h3 class="gdpr-cookie-notice-modal-cookie-title">{{title}}</h3>
      <input type="checkbox" name="gdpr-cookie-notice-{{prefix}}" id="gdpr-cookie-notice-{{prefix}}" class="gdpr-cookie-notice-modal-cookie-input" {{checked}}>
      <label class="gdpr-cookie-notice-modal-cookie-input-switch" for="gdpr-cookie-notice-{{prefix}}"></label>
    </div>
    <p class="gdpr-cookie-notice-modal-cookie-info">{{desc}}</p>
  </li>`,
  modal: `<div class="gdpr-cookie-notice-modal">
    <div class="gdpr-cookie-notice-modal-content">
      <div class="gdpr-cookie-notice-modal-header">
        <h2 class="gdpr-cookie-notice-modal-title">{{settings}</h2>
        <button type="button" class="gdpr-cookie-notice-modal-close"></button>
      </div>
      <ul class="gdpr-cookie-notice-modal-cookies"></ul>
      <div class="gdpr-cookie-notice-modal-footer">
        <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement">{{statement}}</a>
        <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn">
            <span>{{save}}</span>
        </a>
      </div>
    </div>
  </div>`
}