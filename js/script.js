document.addEventListener('DOMContentLoaded', () => {
	// GSAP 플러그인 등록
	gsap.registerPlugin(TextPlugin);

	const nameSlideLi = gsap.utils.toArray('.name-slider .swiper-slide');
	nameSlideLi.forEach((slide, index) => {
		gsap.from(slide, {
			opacity: 0,
			y: 50,
			delay: index * 0.05,
			duration: 0.6,
			ease: 'power2.out',
		});
	});

	// 커서 애니메이션
	const cursor = document.querySelector('#cursor');
	let mouseX = 0;
	let mouseY = 0;
	let cursorX = 0;
	let cursorY = 0;

	// nameSlider 영역
	const nameSliderArea = document.querySelector('.name-slider');

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
		// 부드러운 이동을 위한 보간 (값이 작을수록 더 부드러움)
		cursorX += (mouseX - cursorX) * 0.05;
		cursorY += (mouseY - cursorY) * 0.05;

		// 커서 위치 업데이트
		gsap.set(cursor, {
			x: cursorX - cursor.offsetWidth / 2,
			y: cursorY - cursor.offsetHeight / 2,
		});
	});

	// 슬라이드 요소들을 랜덤하게 섞는 함수
	const shuffleSlides = () => {
		const nameSlides = Array.from(
			document.querySelector('.name-slider .swiper-wrapper').children
		);
		const picSlides = Array.from(
			document.querySelector('.pic-slider .swiper-wrapper').children
		);

		// 같은 랜덤 순서를 두 슬라이더에 적용
		const randomOrder = [...Array(nameSlides.length).keys()].sort(
			() => Math.random() - 0.5
		);

		// name-slider 재정렬
		randomOrder.forEach((index) => {
			document
				.querySelector('.name-slider .swiper-wrapper')
				.appendChild(nameSlides[index]);
		});

		// pic-slider 재정렬 (같은 순서로)
		randomOrder.forEach((index) => {
			document
				.querySelector('.pic-slider .swiper-wrapper')
				.appendChild(picSlides[index]);
		});
	};

	// 슬라이드 섞기 실행
	shuffleSlides();

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
		speed: 1600,
		thumbs: {
			swiper: nameSlider,
		},
	});

	// 텍스트 애니메이션 함수
	const animateText = (text) => {
		gsap.to('.title', {
			duration: 0.5,
			text: {
				value: text,
				delimiter: '',
			},
			ease: 'none',
		});
	};

	// 타이틀 갱신 함수
	const updateTitle = () => {
		const activeSlide = document.querySelector(
			'.name-slider .swiper-slide-active'
		);
		if (activeSlide) {
			const nameText = activeSlide.querySelector('p').textContent;
			animateText(nameText);
		}
	};

	// 슬라이드 변경 이벤트 처리
	picSlider.on('slideChange', () => {
		const activeIndex = picSlider.realIndex;
		const nameText =
			nameSlider.slides[activeIndex].querySelector('p').textContent;
		animateText(nameText);
	});

	// 초기 활성 슬라이드의 텍스트 표시
	const initialActiveSlide = document.querySelector(
		'.name-slider .swiper-slide-active'
	);
	if (initialActiveSlide) {
		const initialText = initialActiveSlide.querySelector('p').textContent;
		animateText(initialText);
	}

	// name-slider 클릭 이벤트 처리
	document.querySelector('.name-slider').addEventListener('click', (e) => {
		const clickedSlide = e.target.closest('.swiper-slide');
		if (clickedSlide) {
			const nameText = clickedSlide.querySelector('p').textContent;
			animateText(nameText);
		}
	});
});
