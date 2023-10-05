
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
    loop: false,
  });
  verticalMobileSwipers = new Swiper('.mobile-swiper-v', {
    // https://open-code.tech/en/post-1109/
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    // Optional parameters
    direction: 'vertical',
    loop: false,
  });
}

function closeDesc() {
  verticalMobileSwipers.forEach((swiper) => {
    swiper.slidePrev(200, () => {})
  });
}

const WEBGL_MODAL_ID = 'webgl-modal';
const WEBGL_PLAYER_ID = 'webglPlayer';

function onViewIn3DClicked(collection, webglIndex) {
  const player = document.getElementById(WEBGL_PLAYER_ID);
  document.getElementById(WEBGL_MODAL_ID).open(() => {
    player.close();
  });
  player.startView(collection, webglIndex);
}