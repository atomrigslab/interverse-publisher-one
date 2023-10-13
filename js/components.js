
// class MarqueeBackgroundText extends HTMLElement {
//   constructor() {
//     super();
//   }

//   render() {
//     const speed = this.getAttribute('speed') ? this.getAttribute('speed') : 20;
//     const opacity = this.getAttribute('opacity') ? this.getAttribute('opacity') : 0.2;
//     const style = `
//       .bg-text {
//         width: 100%;
//         max-width: 100%;
//         overflow-x: hidden;
//         position: fixed;
//         color: var(--white);
//         opacity: ${opacity};
//         font-size: var(--background);
//         font-weight: 900;
//         text-transform: uppercase;
//         z-index: -2;
//       }

//       .bg-text .track {
//         position: relative;
//         white-space: nowrap;
//         will-change: transform;
//         animation: marquee ${speed}s linear infinite;
//       }

//       @keyframes marquee {
//         from {
//           transform: translateX(0); 
//         }
//         to {
//           transform: translateX(-50%);
//         }
//       }

//       @media (hover: hover) {
//         .bg-text.content {
//           -webkit-transform: translateY(calc(100% - 8rem));
//           transform: translateY(calc(100% - 8rem));
//         }
//       }
//     `;
//     this.innerHTML = `
//       <style>
//         ${style}
//       </style>
//       <div class="bg-text">
//         <div class="track">
//           <div class="content">
//             <slot />
//           </div>
//         </div>
//       </div>
//     `;
//   }

//   connectedCallback() {
//     this.render();
//   }
// }
// customElements.define('atomrigs-bg-text', MarqueeBackgroundText);

/* 모바일 */
class NFTContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const oneTimeImage = this.getAttribute('oneTimeImage');
    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');
    const category = this.getAttribute('category');
    const content = this.getAttribute('content');
    const collection = this.getAttribute('collection');
    const itemNo = this.getAttribute('item-no');

    // this.innerHTML = `
    //   <div class="swiper mobile-swiper-v mobile-safari-full-height">
    //     <div class="swiper-wrapper mobile-safari-full-height">
    //       <div class="swiper-slide mobile-slide mobile-safari-full-height">
    //       <div class="benefit-image">
    //         <button
    //           style="background: transparent; text-decoration: none;"
    //           onClick="onBenefitBadgeClicked('${collection}', '${itemNo}')"
    //         >
    //           <img src="../assets/btn-benefit.png" />
    //         </button>
    //       </div>
    //         <atomrigs-nft-view
    //           oneTimeImage="${oneTimeImage}"
    //           collection="${collection}"
    //           item-no="${itemNo}"
    //         ></atomrigs-nft-view>
    //       </div>
    //       <div class="swiper-slide mobile-slide mobile-safari-full-height">
    //         <div class="--a-full-view --a-flex-center">
    //           <div class="--a-full-view">

    //             <!-- 중요: 일부러 atomrigs-nft-view를 배경으로 깔아서 오버레이 된것 같은 효과를 줌 -->
    //             <atomrigs-nft-view
    //               style="position: fixed; width: 100%;"
    //               oneTimeImage="${oneTimeImage}"
    //             ></atomrigs-nft-view>

    //             <div class="desc-container --a-flex-center">
    //               <div class="nft-desc-area">
    //                 <div class="category"><span>${category}<span></div>
    //                 <span class="subtitle">${subtitle}</span>
    //                 <span class="title">${title}</span>
    //                 <span class="content" style="margin-top: 1.25rem">${content}</span>
    //               </div>
    //               <button type="button" class="closeDescptionButton" onClick="closeDesc()">
    //                 <img src="../assets/mobile/icon-close.svg" alt="" />
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // `;

    this.innerHTML = `
      <div class="swiper mobile-swiper-v safari-full-height">
        <div class="swiper-wrapper">
          <div class="swiper-slide mobile-slide">
          <div class="benefit-image">
            <button
              style="background: transparent; text-decoration: none;"
              onClick="onBenefitBadgeClicked('${collection}', '${itemNo}')"
            >
              <img src="../assets/btn-benefit.png" />
            </button>
          </div>
            <atomrigs-nft-view
              oneTimeImage="${oneTimeImage}"
              collection="${collection}"
              item-no="${itemNo}"
            ></atomrigs-nft-view>

          </div>
          <div class="swiper-slide mobile-slide">
              
                <!-- 중요: 일부러 atomrigs-nft-view를 배경으로 깔아서 오버레이 된것 같은 효과를 줌 -->
                <atomrigs-nft-view
                  style="position: fixed; width: 100%; height: 100%; z-index: -1"
                  oneTimeImage="${oneTimeImage}"
                ></atomrigs-nft-view>
              
                <div class="desc-container flex-center">
                  <div class="nft-desc-area">
                    <div class="category"><span>${category}<span></div>
                    <span class="subtitle">${subtitle}</span>
                    <span class="title">${title}</span>
                    <span class="content" style="margin-top: 1.25rem">${content}</span>
                  </div>
                  <button type="button" class="closeDescptionButton" onClick="closeDesc()">
                    <img src="../assets/mobile/icon-close.svg" alt="" />
                  </button>
                </div>
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('atomrigs-nft-container', NFTContainer);

class NFTView extends AtomrigsElement {
  constructor() {
    super();
  }

  render() {
    const { lang, langObj } = this.getLanguage();
    const oneTimeImage = this.getAttribute('oneTimeImage');
    const collection = this.getAttribute('collection');
    const itemNo = this.getAttribute('item-no');

    const showPrevBtn = itemNo === '1' ? 'hidden' : 'visible';
    const showNextBtn = (() => {
      if (collection === 'kansong') {
        return itemNo === '3' ? 'hidden' : 'visible';
      } else if (collection === 'ifland') {
        return itemNo === '5' ? 'hidden' : 'visible';
      } else if (collection === 'pinzle') {
        return itemNo === '6' ? 'hidden' : 'visible';
      }
    })();

    const onViewIn3DClicked = collection ? `onClick="onViewIn3DClicked('${collection}', '${itemNo}')"` : '';

    // this.innerHTML = `
    //   <div class="mobile-page-container">
    //     <div class="mobile-page-content">
    //       <button type="button">
    //         <img src="../assets/mobile/icon-To-Left.svg" />
    //       </button>
    //       <div style="flex-shrink: 1; width: 100%; display: flex; justify-content: center">
    //         <img src="${oneTimeImage}" />
    //       </div>
    //       <button type="button">
    //         <img src="../assets/mobile/icon-To-Right.svg" />
    //       </button>
    //     </div>
    //     <div class="mobile-button-group">
    //       <div class="mobile-button-group-row">
    //         <button
    //           type="button"
    //           class="tool-button"
    //           ${onViewIn3DClicked}
    //         >
    //           <img src="../assets/icon-3d_2.svg" style="display: inline-block" />${langObj['view']}
    //         </button>
    //         <button type="button" class="tool-button" onClick="onSampleClicked('${collection}', '${itemNo}')">
    //           <img src="../assets/icon-if.svg" width="18" height="19" style="display: inline-block;" />${langObj['sample']}
    //         </button>
    //       </div>
    //       <div class="mobile-button-group-row">
    //         <button
    //           type="button"
    //           class="tool-button full-width"
    //           style="background-image: linear-gradient(117deg, #FF007D 0%, #490FBB 100%)"
    //           onClick="onPurchaseClicked('${collection}', '${itemNo}')"
    //         >
    //           <img src="../assets/icon-ifland.svg" />
    //           <span>${langObj['purchase']}</span>
    //         </button>
    //       </div>
    //     </div>
    //     <div class="bottom-down-arrow-mobile">
    //         <img class="icon-arrow" src="../assets/icon-arrow-mobile.svg" alt="" />
    //       </div>
    //   </div>
    // `;

    this.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column;
        align-items: center; justify-content: space-between">
        <div style="width: 100%; height: calc(100% - 200px - 20px); margin-top: 56px; 
          display: flex; align-items: center; justify-content: space-between;">

            <div style="width: 50px">
              <button type="button" class="mobile-prev-nft-btn" style="visibility: ${showPrevBtn};">
                <img src="../assets/mobile/icon-To-Left.svg" />
              </button>
            </div>
            <div style="height: 100%; width: calc(100% - 100px); 
              display: flex; justify-content: center; align-items: center">

              <img src="${oneTimeImage}" 
                style="width: 100%; height: 100%; object-fit: contain"
                alt="" />

            </div>
            <div style="width: 50px">
              <button type="button" class="mobile-next-nft-btn" style="visibility: ${showNextBtn};">
                <img src="../assets/mobile/icon-To-Right.svg" />
              </button>
            </div>
        </div>

        <div style="width: 100%; height: 200px; 
          display: flex; flex-direction: column; align-items: center;">

          <div class="mobile-button-group">
            <div class="mobile-button-group-row">
              <button
                type="button"
                class="tool-button"
                ${onViewIn3DClicked}
              >
                <img src="../assets/icon-3d_2.svg" style="display: inline-block" />${langObj['view']}
              </button>
              <button type="button" class="tool-button" onClick="onSampleClicked('${collection}', '${itemNo}')">
                <img src="../assets/icon-if.svg" style="display: inline-block;" />${langObj['sample']}
              </button>
            </div>
            <div class="mobile-button-group-row">
              <button
                type="button"
                class="tool-button full-width"
                style="background-image: linear-gradient(117deg, #FF007D 0%, #490FBB 100%)"
                onClick="onPurchaseClicked('${collection}', '${itemNo}')"
              >
                <img src="../assets/icon-ifland.svg" />
                <span>${langObj['purchase']}</span>
              </button>
            </div>
          </div>

          <div class="bottom-down-arrow-mobile" style="margin: 0;">
            <img class="icon-arrow" src="../assets/icon-arrow-mobile.svg" alt="" />
          </div>
    

        </div>

      </div>
    `;    
  }

  connectedCallback() {
    super.connectedCallback()
      .then(() => {
        this.render();
      });
  }
}

customElements.define('atomrigs-nft-view', NFTView);

/* 데스크탑 */
class ButtonGroup extends AtomrigsElement {
  constructor() {
    super();
  }

  render() {
    const { lang, langObj } = this.getLanguage();
    const collection = this.getAttribute('collection');
    const itemNo = this.getAttribute('item-no');
    const deviceType = this.getAttribute('device-type') ? this.getAttribute('device-type') : '';
    const isPinzle = this.getAttribute('is-pinzle') ? this.getAttribute('is-pinzle') : '';
    const onViewIn3DClicked = `onViewIn3DClicked('${collection}', '${itemNo}', '${deviceType}')`;
    const onSampleClicked = `onSampleClicked('${collection}', '${itemNo}', '${deviceType}')`;

    this.innerHTML = `
      <div class="button-area ${isPinzle}">
        <button type="button" onClick="${onViewIn3DClicked}">
          <img src="../assets/icon-3d_2.svg" />
          <span>${langObj['view']}</span>
        </button>
        <button type="button" onClick="${onSampleClicked}">
          <img src="../assets/icon-if.svg" />
          <span>${langObj['sample']}</span>
        </button>
        <button
          type="button"
          class="full-width"
          style="background-image: linear-gradient(117deg, #FF007D 0%, #490FBB 100%)"
          onClick="onPurchaseClicked('${collection}', '${itemNo}')"
        >
          <img src="../assets/icon-ifland.svg" />
          <span>${langObj['purchase']}</span>
        </button>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback()
      .then(() => {
        this.render();
      });
  }
}

customElements.define('atomrigs-button-group', ButtonGroup);