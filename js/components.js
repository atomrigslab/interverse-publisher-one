class NFTContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const oneTimeImage = this.getAttribute('oneTimeImage');
    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');
    const content = this.getAttribute('content');
    const collection = this.getAttribute('collection');
    const webglIndex = this.getAttribute('webglIndex');

    this.innerHTML = `
      <div class="swiper mobile-swiper-v">
        <div class="swiper-wrapper">
          <div class="swiper-slide mobile-slide">
            <atomrigs-nft-view
              oneTimeImage="${oneTimeImage}"
              collection="${collection}"
              webglIndex="${webglIndex}"
            ></atomrigs-nft-view>
          </div>
          <div class="swiper-slide mobile-slide">
            <div class="--a-full-view --a-flex-center">
              <div class="--a-full-view">

                <!-- 중요: 일부러 atomrigs-nft-view를 배경으로 깔아서 오버레이 된것 같은 효과를 줌 -->
                <atomrigs-nft-view
                  style="position: fixed; width: 100%;"
                  oneTimeImage="${oneTimeImage}"
                ></atomrigs-nft-view>
              
                <div class="desc-container --a-flex-center">
                  <div class="item-text">
                    <span class="subtitle">${subtitle}</span>
                    <span class="title">${title}</span>
                    <span class="content">${content}</span>
                  </div>
                  <button type="button" class="closeDescptionButton" onClick="closeDesc()">
                    <img src="../assets/mobile/icon-close.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('atomrigs-nft-container', NFTContainer);

class NFTView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const oneTimeImage = this.getAttribute('oneTimeImage');
    const collection = this.getAttribute('collection');
    const webglIndex = this.getAttribute('webglIndex');

    const onViewIn3DClicked = collection ? `onClick="onViewIn3DClicked('${collection}', ${webglIndex})"` : '';

    this.innerHTML = `
      <div class="mobile-page-container">
        <div class="mobile-page-content">
          <button type="button">
            <img src="../assets/mobile/icon-To-Left.svg" />
          </button>
          <img src="${oneTimeImage}" />
          <button type="button">
            <img src="../assets/mobile/icon-To-Right.svg" />
          </button>
        </div>
        <div class="mobile-button-group">
          <button
            type="button"
            class="tool-button"
            ${onViewIn3DClicked}
          >
            <img src="../assets/icon-3d_2.svg" style="display: inline-block" />3D 보기
          </button>
          <button type="button" class="tool-button" onClick="alert('적용 예')">
            <img src="../assets/icon-3d_2.svg" style="display: inline-block" />적용 예
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('atomrigs-nft-view', NFTView);