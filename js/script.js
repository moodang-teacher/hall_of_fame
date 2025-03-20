document.addEventListener("DOMContentLoaded", () => {
  // GSAP 플러그인 등록
  gsap.registerPlugin(TextPlugin);

  // 커서 애니메이션
  const cursor = document.querySelector("#cursor");
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // 마우스 이동 이벤트
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // GSAP 애니메이션
  gsap.ticker.add(() => {
    // 부드러운 이동을 위한 보간 (값이 작을수록 더 부드러움)
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    // 커서 위치 업데이트
    gsap.set(cursor, {
      x: cursorX - cursor.offsetWidth / 2,
      y: cursorY - cursor.offsetHeight / 2,
    });
  });

  // 슬라이드 요소들을 랜덤하게 섞는 함수
  const shuffleSlides = () => {
    const nameSlides = Array.from(
      document.querySelector(".name-slider .swiper-wrapper").children
    );
    const picSlides = Array.from(
      document.querySelector(".pic-slider .swiper-wrapper").children
    );

    // 같은 랜덤 순서를 두 슬라이더에 적용
    const randomOrder = [...Array(nameSlides.length).keys()].sort(
      () => Math.random() - 0.5
    );

    // name-slider 재정렬
    randomOrder.forEach((index) => {
      document
        .querySelector(".name-slider .swiper-wrapper")
        .appendChild(nameSlides[index]);
    });

    // pic-slider 재정렬 (같은 순서로)
    randomOrder.forEach((index) => {
      document
        .querySelector(".pic-slider .swiper-wrapper")
        .appendChild(picSlides[index]);
    });
  };

  // 슬라이드 섞기 실행
  shuffleSlides();

  const nameSlider = new Swiper(".name-slider", {
    loop: true,
    slidesPerView: "auto",
    mousewheel: true,
    spaceBetween: 2,
  });

  const picSlider = new Swiper(".pic-slider", {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    effect: "fade",
    thumbs: {
      swiper: nameSlider,
    },
  });

  // 텍스트 애니메이션 함수
  const animateText = (text) => {
    gsap.to(".title", {
      duration: 0.6,
      text: {
        value: text,
        delimiter: "",
      },
      ease: "none",
    });
  };

  // 초기 활성 슬라이드의 텍스트 표시
  const initialActiveSlide = document.querySelector(
    ".name-slider .swiper-slide-active"
  );
  if (initialActiveSlide) {
    const initialText = initialActiveSlide.querySelector("p").textContent;
    animateText(initialText);
  }

  // name-slider 클릭 이벤트 처리
  document.querySelector(".name-slider").addEventListener("click", (e) => {
    const clickedSlide = e.target.closest(".swiper-slide");
    if (clickedSlide) {
      const nameText = clickedSlide.querySelector("p").textContent;
      animateText(nameText);
    }
  });
});
