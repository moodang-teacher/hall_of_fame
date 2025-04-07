// GSAP 플러그인 등록
gsap.registerPlugin(TextPlugin);
document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 선택
    const cursor = document.querySelector('#cursor');
    const nameSliderArea = document.querySelector('.name-slider');
    // const nameSliderWrapper = document.querySelector('.name-slider .swiper-wrapper');
    // const picSliderWrapper = document.querySelector('.pic-slider .swiper-wrapper');

    const nameSliderLi = gsap.utils.toArray('.name-slider .swiper-slide');
    nameSliderLi.forEach((li, index) => {
        gsap.from(li, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.04,
            ease: 'none',
        });
    });

    // 텍스트 추출 함수
    const getSlideText = (slide) => {
        return slide.querySelector('p').textContent;
    };

    // 텍스트 애니메이션 함수
    const animateText = (text) => {
        gsap.to('.title', {
            duration: 0.8,
            text: {
                value: text,
                delimiter: '',
            },
            ease: 'none',
        });
    };

    // 커서 애니메이션 변수
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // nameSlider 영역 마우스 이벤트
    nameSliderArea.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            duration: 0.8,
            backgroundColor: 'rgba(71, 101, 11, 0.6)',
            width: 120,
            height: 120,
            textContent: 'CLICK',
            ease: 'elastic.out(1,0.3)',
        });
    });

    nameSliderArea.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            duration: 0.3,
            backgroundColor: 'rgba(11, 28, 101, 0.6)',
            width: 120,
            height: 120,
            textContent: 'VIEW',
            ease: 'power2.out',
        });
    });

    // 마우스 이동 이벤트
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // GSAP 애니메이션
    gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.05;
        cursorY += (mouseY - cursorY) * 0.05;

        gsap.set(cursor, {
            x: cursorX - cursor.offsetWidth / 2,
            y: cursorY - cursor.offsetHeight / 2,
        });
    });

    // Swiper 초기화
    const nameSlider = new Swiper('.name-slider', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 2,
        simulateTouch: true, // 터치 기능 활성화
        allowTouchMove: false, // 드래그 동작 비활성화
    });

    const picSlider = new Swiper('.pic-slider', {
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
        },
        effect: 'fade',
        speed: 800,
        thumbs: {
            swiper: nameSlider,
        },
    });

    // slideChange 이벤트로 다시 변경
    picSlider.on('slideChange', () => {
        const activeIndex = picSlider.realIndex;
        const nameText = getSlideText(nameSlider.slides[activeIndex]);
        animateText(nameText);
    });

    // 초기 활성 슬라이드의 텍스트 표시
    const initialActiveSlide = document.querySelector('.name-slider .swiper-slide-active');
    if (initialActiveSlide) {
        animateText(getSlideText(initialActiveSlide));
    }

    // name-slider 클릭 이벤트 처리
    nameSliderArea.addEventListener('click', (e) => {
        const clickedSlide = e.target.closest('.swiper-slide');
        if (clickedSlide) {
            animateText(getSlideText(clickedSlide));
        }
    });
});
