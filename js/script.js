document.addEventListener('DOMContentLoaded', () => {
    // GSAP 플러그인 등록
    gsap.registerPlugin(TextPlugin);

    // DOM 요소 선택
    const cursor = document.querySelector('#cursor');
    const nameSliderArea = document.querySelector('.name-slider');
    const nameSliderWrapper = document.querySelector('.name-slider .swiper-wrapper');
    const picSliderWrapper = document.querySelector('.pic-slider .swiper-wrapper');

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
            duration: 0.2,
            text: {
                value: text,
                delimiter: '',
            },
            ease: 'none',
        });
    };

    // 슬라이드 요소들을 랜덤하게 섞는 함수
    const shuffleSlides = () => {
        const nameSlides = Array.from(nameSliderWrapper.children);
        const picSlides = Array.from(picSliderWrapper.children);

        // 같은 랜덤 순서를 두 슬라이더에 적용
        const randomOrder = [...Array(nameSlides.length).keys()].sort(() => Math.random() - 0.5);

        // 슬라이드 재정렬
        randomOrder.forEach((index) => {
            nameSliderWrapper.appendChild(nameSlides[index]);
            picSliderWrapper.appendChild(picSlides[index]);
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
            width: 200,
            height: 100,
            textContent: 'WHEEL || CLICK',
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

    // 슬라이드 섞기 실행
    shuffleSlides();

    // Swiper 초기화
    const nameSlider = new Swiper('.name-slider', {
        loop: true,
        slidesPerView: 'auto',
        mousewheel: true,
        spaceBetween: 2,
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
