// common.js

class AtomrigsElement extends HTMLElement {
  json = null

  constructor() {
    super()
  }

  loadTexts() {
    // Ref: https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
    // 브라우저의 디스크 캐시를 활용
    return fetch('../assets/texts.json')
      .then((response) => response.json())
      .then((json) => {
        // (window as any).atomrigs.texts = json
        this.json = json;
      });
  }

  connectedCallback() {
    return this.loadTexts();
  }
}


class AtomrigsCloseElement extends HTMLElement {
  constructor() {
    super();
  }

  setOnClick(handler) {
    document.querySelector('.atomrigs-btn-close').onclick = handler;
  }

  render() {
    const style = `
      .atomrigs-btn-close {
        display: inline-block;
        width: 2rem;
        height: 2rem;
      }

      .atomrigs-btn-close-icon {
        width: 100%;
        height: 100%;
      }
    `;
    this.innerHTML = `
      <style>
        ${style}
      </style>
      <button type="button" class="atomrigs-btn-close">
        <img src="../assets/mobile/icon-close.svg" alt="" class="atomrigs-btn-close-icon" />
      </button>
    `;
  }

  connectedCallback() {
    this.render();
  }
};

customElements.define('atomrigs-close-button', AtomrigsCloseElement);

class NavigationBarElement extends AtomrigsElement {
  self = null;
  constructor() {
    super();
    self = this;
  }

  render() {
    let activeKey = this.getAttribute('activekey') || '';

    const tokens = window.location.pathname.split('/');
    let [lang] = tokens.slice(-2, -1);
    if (lang === undefined
      || this.json[lang] === undefined
      || (lang !== undefined && lang.length === 0)) {
      lang = 'kr';
    }

    let [filename] = tokens.slice(-1);
    if (filename !== undefined && filename.length === 0) {
      filename = 'index.html';
    }

    const urlPrefix = tokens.slice(0, -2).join('/');

    const langObj = this.json[lang] ?? this.json['kr'];

    // 여기 들어간 순서가 화면의 순서가 됨.
    let pageURL = {
      about: `${urlPrefix}/${lang}#about-page`,
      ifland: `${urlPrefix}/${lang}/ifland.html`,
      kansong: `${urlPrefix}/${lang}/kansong.html`,
      pinzle: `${urlPrefix}/${lang}/pinzle.html`,
      benefits: `${urlPrefix}/${lang}/benefits.html`
    };

    const menuButtons = Object.entries(pageURL).map(([pageKey, pageUrl]) => (
      `
        <a
          href="${pageUrl}" class="${pageKey === activeKey ? 'active' : ''}"
        >
          ${langObj[pageKey]}
        </a>
      `
    )).join('');

    const otherLang = lang === 'kr' ? 'en' : 'kr';
    let langSwitchUrl = `${urlPrefix}/${otherLang}/${filename}`;

    const homeUrl = `${urlPrefix}/${lang}`;

    function langSwitchButton(className, style) {
      return `
        <a href="${langSwitchUrl}" class=${className} style="${style}">
          ${otherLang === 'kr' ? '한글' : 'EN'}
        </a>
      `;
    }

    this.innerHTML = `
      <nav class="navbar">
        <div class="navbar-container">
          <a class="navbar-brand" href="${homeUrl}">
            <img src="../assets/logo.svg" />
          </a>
          <button class="mobile" type="button" id="top-hamberger-button" style="padding-left: 4rem">
            <img src="../assets/mobile/icon-menu.svg" />
          </button>
          <div class="web">
            <div class="menu-button-group">
              ${menuButtons}
              ${langSwitchButton('', 'margin-left: 0.5rem')}
            </div>
          </div>
        </div>
      </nav>
      <div id="menu-modal" class="menu-modal">
        <div class="menu-modal-container">
          <div class="menu-modal-header">
            ${langSwitchButton('', '')}
            <atomrigs-close-button id="menu-modal-close-button"></atomrigs-close-button>
          </div>
          <div class="menu-button-group">
            ${menuButtons}
          </div>
          <div class="menu-modal-footer">
            © Atomrigs Lab Inc.
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback()
      .then(() => {
        this.render();

        document.getElementById('top-hamberger-button').onclick = function () {
          self.showMenuModal();
        }

        document.getElementById('menu-modal-close-button').setOnClick(function () {
          self.hideMenuModal();
        });
      });
  }

  showMenuModal() {
    document.getElementById('menu-modal').style.display = 'block';
  }

  hideMenuModal() {
    document.getElementById('menu-modal').style.display = 'none';
  }
};

customElements.define('navigation-bar-element', NavigationBarElement);