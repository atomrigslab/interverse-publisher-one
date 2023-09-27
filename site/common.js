// common.js

class AtomrigsElement extends HTMLElement {
  json = null

  constructor() {
    super()
  }

  getTexts() {
    const searchParams = new URLSearchParams(window.location.search)
    const lang = searchParams.has('lang') ? searchParams.get('lang') : 'kr'

    if (!this.json) {
      throw new Error("Something went wrong!");
    }

    return this.json[lang] ?? this.json['kr'];
  }

  loadTexts() {
    // Ref: https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
    // 브라우저의 디스크 캐시를 활용
    return fetch('assets/texts.json')
      .then((response) => response.json())
      .then((json) => {
        // (window as any).atomrigs.texts = json
        this.json = json;
      });
  }
}

class SpanElement extends AtomrigsElement {
  json = null

  constructor() {
    super()
  }

  render() {
    const langObj = this.getTexts();

      // browser calls this method when the element is added to the document
      // (can be called many times if an element is repeatedly added/removed)
    const textKey = this.getAttribute('textKey');
    this.innerHTML = textKey ? `${langObj[textKey] ?? ''}` : 'NO_KEY';
  }

  connectedCallback() {
    this.loadTexts()
    .then(() => {
      this.render();
    });
  }
}

customElements.define('atomrigs-span', SpanElement);

class NavigationBarElement extends AtomrigsElement {
  constructor() {
    super();
  }

  render() {
    const langObj = this.getTexts();

    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.has('mode') ? searchParams.get('mode') : 'dev';
    const lang = searchParams.has('lang') ? searchParams.get('lang') : 'kr';

    let pageURL = {
      kansong: mode === 'dev' ? `kansong.html?lang=${lang}` : `${lang}/kansong.html`,
      pinzle: mode === 'dev' ? `pinzle.html?lang=${lang}` : `${lang}/pinzle.html`,
      skt: mode === 'dev' ? `skt.html?lang=${lang}` : `${lang}/skt.html`
    };
    
    let koreanSwitchURL = mode === 'dev' ? `${window.location.pathname}?lang=kr` : `kr/${window.location.pathname}`;
    let englishSwitchURL = mode === 'dev' ? `${window.location.pathname}?lang=en` : `en/${window.location.pathname}`;

    if (mode === 'dev') {
      pageURL.kansong += '&mode=dev';
      pageURL.pinzle += '&mode=dev';
      pageURL.skt += '&mode=dev';

      koreanSwitchURL += '&mode=dev';
      englishSwitchURL += '&mode=dev';
    }

    this.innerHTML = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Interverse
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="${pageURL.kansong}">${langObj.kansong}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${pageURL.pinzle}"/>${langObj.pinzle}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${pageURL.skt}">${langObj.skt}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${koreanSwitchURL}">${lang === 'kr' ? '한국어' : 'Korean'}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="${englishSwitchURL}">${lang === 'en' ? 'English' : '영어'}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  connectedCallback() {
    this.loadTexts()
    .then(() => {
      this.render();
    });
  }
};

customElements.define('navigation-bar-element', NavigationBarElement);