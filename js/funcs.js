
let verticalMobileSwipers;
function init() {
  const swiper = new Swiper('.desktop-fullpage', {
    // Optional parameters
    direction: 'vertical',
    mousewheel: true,
    loop: false,
  });

  new Swiper('.mobile-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false
  });

  if (document.querySelector('.mobile-swiper-v')) {
    verticalMobileSwipers = new Swiper('.mobile-swiper-v', {
      nested: true,
      // https://open-code.tech/en/post-1109/
      effect: 'fade',
      fadeEffect: {
          crossFade: true
      },
      // Optional parameters
      direction: 'vertical',
      loop: false
    });
  }
}

function closeDesc() {
  verticalMobileSwipers.forEach((swiper) => {
    swiper.slidePrev(200, () => {})
  });
}

const WEBGL_MODAL_ID = 'webgl-modal';
const WEBGL_PLAYER_ID = 'webglPlayer';
const SAMPLE_MODAL_ID = 'sample-modal';

function onViewIn3DClicked(collection, itemNo) {
  const player = document.getElementById(WEBGL_PLAYER_ID);

  const onShownCallback = () => {
    setTimeout(() => {
      player.startView(collection, itemNo);
    }, 200);
  };
  const onHideCallback = () => {
    player.close();
  };

  document.getElementById(WEBGL_MODAL_ID).open(onShownCallback, onHideCallback);
}

function onSampleClicked(collection, imgIndex) {
  const imgElm = document.querySelector('#sample-modal > img');
  imgElm.src = `../assets/${collection}/sample-${imgIndex}.png`;

  const onShownCallback = () => {};
  const onHideCallback = () => {};
  document.getElementById(SAMPLE_MODAL_ID).open(onShownCallback, onHideCallback);
}