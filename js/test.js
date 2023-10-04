const carouselList1 = document.querySelector('#carousel-list1');
const carouselList2 = document.querySelector('#carousel-list2');
const carouselList3 = document.querySelector('#carousel-list3');
// carousel item 너비
const width = document.querySelector('.carousel-content').clientWidth;
// carousel item 전체 갯수
const carouselItemCount = document.querySelectorAll('.carousel-content').length / 3;

// drag에 의해 움직인 X값
let moveTranslateX = 0;
// 현재 X값
let currentTranslateX = 0;
// drag에 의해 변경될 X값
let nextTranslateX = 0;
// drag 시작여부
let isMove = false;
// drag 시작위치 X값
let moveStartX = 0;
// item 이동을 위한 gap 기준값
const moveGap = 22;

// drag 시작 이벤트
const dragStart = (clientX) => {
  isMove = true;
  moveStartX = clientX

  // carousel list transition 제거
  carouselList1.classList.remove('carousel-list-transition');
  carouselList2.classList.remove('carousel-list-transition');
  carouselList3.classList.remove('carousel-list-transition');
}

// drag 중 이벤트
const dragging = (clientX) => {
  if(isMove) {
    moveTranslateX = clientX - moveStartX;
    nextTranslateX = currentTranslateX + moveTranslateX;

    // 오른쪽으로 최대 이동한 경우
    if(nextTranslateX < -width * (carouselItemCount - 1)) {
      nextTranslateX = -width * (carouselItemCount - 1);
    } 

    // 왼쪽으로 최대 이동한 경우
    else if(nextTranslateX > 0) {
      nextTranslateX = 0;
    }

    carouselList1.style.transform = `translateX(${nextTranslateX}px)`;
    carouselList2.style.transform = `translateX(${nextTranslateX}px)`;
    carouselList3.style.transform = `translateX(${nextTranslateX}px)`;
  }
}

// drag 종료 이벤트
const dragEnd = () => {
  if(isMove) {
    // 초기화 
    isMove = false;
    moveStartX = 0;
    carouselList1.classList.add('carousel-list-transition');
    carouselList2.classList.add('carousel-list-transition');
    carouselList3.classList.add('carousel-list-transition');

    // 오른쪽으로 이동한 경우
    if(currentTranslateX > nextTranslateX) {
      if((currentTranslateX - nextTranslateX) % width > moveGap) {
        currentTranslateX = -(Math.floor(-nextTranslateX / width) + 1) * width;
      } else {
        currentTranslateX = -(Math.floor(-nextTranslateX / width)) * width;
      }
    }

    // 왼쪽으로 이동한 경우
    else if(currentTranslateX < nextTranslateX) {
      if((nextTranslateX - currentTranslateX) % width > moveGap) {
        currentTranslateX = -(Math.floor(-nextTranslateX / width)) * width;
      } else {
        currentTranslateX = -(Math.floor(-nextTranslateX / width) + 1) * width;
      }
    }

    carouselList1.style.transform = `translateX(${currentTranslateX}px)`;
    carouselList2.style.transform = `translateX(${currentTranslateX}px)`;
    carouselList3.style.transform = `translateX(${currentTranslateX}px)`;
  }
}

// PC
carouselList1.addEventListener('mousedown', (e) => dragStart(e.clientX));
// carouselList2.addEventListener('mousedown', (e) => dragStart(e.clientX));
carouselList3.addEventListener('mousedown', (e) => dragStart(e.clientX));
window.addEventListener('mousemove', (e) => dragging(e.clientX));
window.addEventListener('mouseup', dragEnd);

// Mobile
carouselList1.addEventListener('touchstart', (e) => dragStart(e.targetTouches[0].clientX));
// carouselList2.addEventListener('touchstart', (e) => dragStart(e.targetTouches[0].clientX));
carouselList3.addEventListener('touchstart', (e) => dragStart(e.targetTouches[0].clientX));
window.addEventListener('touchmove', (e) => dragging(e.targetTouches[0].clientX));
window.addEventListener('touchend', dragEnd);