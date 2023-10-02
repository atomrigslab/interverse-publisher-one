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

class NavigationBarElement extends AtomrigsElement {
  constructor() {
    super();
  }

  render() {
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
    
    let pageURL = {
      kansong: `${urlPrefix}/${lang}/kansong.html`,
      pinzle:  `${urlPrefix}/${lang}/pinzle.html`,
      skt: `${urlPrefix}/${lang}/skt.html`
    };

    const menuButtons = Object.entries(pageURL).map(([pageKey, pageUrl]) => (
      `
        <li class="nav-item">
          <a
            class="nav-link ${filename.indexOf(pageKey) >= 0 ? 'active' : ''}"
            aria-current="page"
            href="${pageUrl}"
          >
            ${langObj[pageKey]}
          </a>
        </li>
      `
    )).join('');
    
    const otherLang = lang === 'kr' ? 'en' : 'kr';
    let langSwitchURL = `${urlPrefix}/${otherLang}/${filename}`;

    this.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary" style="position:fixed; z-index:10; width:100%">
        <div class="container-fluid">
          <a class="navbar-brand" href="/${lang}">
            Interverse
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              ${menuButtons}
              <li class="nav-item">
                <a class="nav-link" href="${langSwitchURL}">${otherLang === 'kr' ? '한글' : 'English'}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  connectedCallback() {
    super.connectedCallback()
    .then(() => {
      this.render();
    });
  }
};

customElements.define('navigation-bar-element', NavigationBarElement);