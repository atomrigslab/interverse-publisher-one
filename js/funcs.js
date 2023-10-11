let fullPageSwiper;
let verticalMobileSwipers;

function moveToNextSlide() {
  fullPageSwiper.slideNext(200, () => {});
}

function init() {
  fullPageSwiper = new Swiper('.desktop-fullpage', {
    // Optional parameters
    direction: 'vertical',
    mousewheel: true,
    loop: false,
  });

  fullPageSwiper.on('slideChange', () => {
    const downArrowElm = document.getElementById('down-arrow-at-bottom');
    if (fullPageSwiper.activeIndex === fullPageSwiper.slides.length - 1) {
      downArrowElm.style.visibility = 'hidden';
    } else {
      downArrowElm.style.visibility = 'visible';
    }
  })

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

function onViewIn3DClicked(collection, itemNo, deviceType) {
  const player = document.getElementById(WEBGL_PLAYER_ID);

  if (collection === 'pinzle' && deviceType === 'desktop') {
    document.getElementById('prev-3d-btn1')
      .style.visibility = 'hidden';
    document.getElementById('next-3d-btn1')
      .style.visibility = 'visible';

    if (itemNo === '1') {
      currentActiveWebGLIndex = 1;
      minWebGLIndex = 1;
      maxWebGLIndex = 3;  
    } else {
      currentActiveWebGLIndex = 4;
      minWebGLIndex = 4;
      maxWebGLIndex = 6;
    }

    itemNo = currentActiveWebGLIndex;
  }

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

function onSampleClicked(collection, imgIndex, deviceType) {
  if (collection !== 'pinzle') {
    const imgElm = document.querySelector('#sample-modal > img');
    imgElm.src = `../assets/${collection}/sample-${imgIndex}.png`;
  }

  const onShownCallback = () => {};
  const onHideCallback = () => {};
  if (collection === 'pinzle' && deviceType === 'desktop') {
    document.getElementById(`sample-modal${imgIndex}`).open(onShownCallback, onHideCallback);
  } else {
    document.getElementById(SAMPLE_MODAL_ID).open(onShownCallback, onHideCallback);
  }
}

function onPurchaseClicked(collection, itemNo) {
  const onShownCallback = () => {};
  const onHideCallback = () => {};
  document.getElementById('benefit-modal').open(onShownCallback, onHideCallback);
}