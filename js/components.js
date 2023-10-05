class NFTView extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const oneTimeImage = this.getAttribute('oneTimeImage');
    const desc = this.getAttribute('desc');
    this.innerHTML = `
      <div class="nft-page">
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
            <button type="button" class="tool-button" onClick="clickFirst()">
              <img src="../assets/mobile/icon-3d_2.svg" style="display: inline-block" />3D 보기
            </button>
            <button type="button" class="tool-button" onClick="alert('적용 예')">
              <img src="../assets/mobile/icon-3d_2.svg" style="display: inline-block" />적용 예
            </button>
          </div>
        </div>
      </div> <!-- nft-page -->
      <div class="empty-page">&nbsp;</div>
      <div class="new-page">
        <div class="desc-container">
          ${desc}
        </div>
      </div>

    `;
  }
}

customElements.define('atomrigs-nft-view', NFTView);