document.addEventListener('DOMContentLoaded', () => {
    // 슬라이드 요소들을 랜덤하게 섞는 함수
    const shuffleSlides = () => {
        const nameSlides = Array.from(document.querySelector('.name-slider .swiper-wrapper').children);
        const picSlides = Array.from(document.querySelector('.pic-slider .swiper-wrapper').children);

        // 같은 랜덤 순서를 두 슬라이더에 적용
        const randomOrder = [...Array(nameSlides.length).keys()].sort(() => Math.random() - 0.5);

        // name-slider 재정렬
        randomOrder.forEach((index) => {
            document.querySelector('.name-slider .swiper-wrapper').appendChild(nameSlides[index]);
        });

        // pic-slider 재정렬 (같은 순서로)
        randomOrder.forEach((index) => {
            document.querySelector('.pic-slider .swiper-wrapper').appendChild(picSlides[index]);
        });
    };

    // 슬라이드 섞기 실행
    shuffleSlides();

    const nameSlider = new Swiper('.name-slider', {
        loop: true,
        // slidesPerView: 4.5,
        slidesPerView: 'auto',
        mousewheel: true,
        spaceBetween: 2,
    });

    const picSlider = new Swiper('.pic-slider', {
        loop: true,
        slidesPerView: 1,

        autoplay: {
            delay: 2000,
        },
        effect: 'fade',

        // 썸네일과 연동
        thumbs: {
            swiper: nameSlider,
        },
    });
});
