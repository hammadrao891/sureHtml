import '../../scss/pages/difference.scss';

// Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Swiper from 'swiper';
import {Autoplay} from 'swiper/modules';

// GSAP
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {loadLottie} from '../utils/loadLottie';

document.addEventListener('DOMContentLoaded', () => {
    heroCarousel();
    differenceGraphic();
    tabsSection().then(r => {});
    handleLottieAnimations();
});

// Hero Carousel
const heroCarousel = () => {
    const swiperMainContainer = document.querySelector('.swiper-carousel');

    if (swiperMainContainer) {
        const swiperMain = new Swiper(`.${swiperMainContainer.className}`, {
            modules: [Autoplay],
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
            centeredSlides: true,
            maxBackfaceHiddenSlides: false,
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2.5,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1280: {
                    slidesPerView: 3.5,
                    spaceBetween: 40,
                },
            }
        });
    }
};

// Difference graphic
const differenceGraphic = () => {
    gsap.registerPlugin(ScrollTrigger);

    const prism = document.querySelectorAll('.difference-prism .prism');
    const rings = document.querySelectorAll('.difference-rings .ring');
    const points = document.querySelectorAll('.difference-points .point');
    const content = document.querySelectorAll('.difference-content-item');
    const trigger = document.querySelector('.difference-graphic');

    gsap.set(gsap.utils.toArray(prism), {
        scale: 0.75,
        opacity: 0,
    });

    gsap.set(gsap.utils.toArray(rings), {
        scale: 0
    });

    gsap.set(gsap.utils.toArray(points), {
        scale: 0
    });

    gsap.set(gsap.utils.toArray(content), {
        opacity: 0,
        yPercent: 25,
    });

    const prismDuration = 0.3;
    const prismEase = 'expo.out';

    const ringsDuration = 0.3;
    const ringsEase = 'expo.out';

    const pointsDuration = 0.3;
    const pointsEase = 'back.out(1.5)';

    const contentsDuration = 0.3;
    const contentsEase = 'expo.out';

    // Create a GSAP timeline
    const tl = gsap.timeline({paused: true});

    tl.to(prism[0], {scale: 1, opacity: 1, duration: prismDuration, ease: prismEase});

    tl.add('content');

    for (let index = 0; index < 1; index++) {
        tl.to(rings[index], {scale: 1, duration: ringsDuration, ease: ringsEase}, `content+=${index * ringsDuration}`);
    }

    tl.to(points[1], {scale: 1, duration: pointsDuration, ease: pointsEase}, `>`);

    for (let index = 1; index < 5; index++) {
        tl.to(rings[index], {scale: 1, duration: ringsDuration, ease: ringsEase}, `content+=${index * ringsDuration}`);
    }

    tl.to(points[2], {scale: 1, duration: pointsDuration, ease: pointsEase}, `>`);

    for (let index = 5; index < 6; index++) {
        tl.to(rings[index], {scale: 1, duration: ringsDuration, ease: ringsEase}, `content+=${index * ringsDuration}`);
    }

    tl.to(points[0], {scale: 1, duration: pointsDuration, ease: pointsEase}, `>`);

    for (let index = 0; index < 6; index++) {
        tl.to(content[index], {opacity: 1, yPercent: 0, duration: contentsDuration, ease: contentsEase}, `content+=${index * contentsDuration}`);
    }

    // Use ScrollTrigger to trigger the animation when scrolling to the element
    ScrollTrigger.create({
        trigger: trigger,
        id: 'graphic',
        start: () => `top center`, // Adjust the starting point as needed
        end: 'top center', // Adjust the starting point as needed
        animation: tl,
        // markers: true, // Display markers for debugging (you can remove this in production)
        toggleActions: 'play none none none', // Define toggle actions for the trigger
    });

    const elementToReveal = content;
    const staggerDuration = 0.1;

    const animateIn = (batch) => {
        gsap.to(batch, {
            opacity: 1,
            yPercent: 0,
            stagger: staggerDuration,
        });
    };

    elementToReveal.forEach((element, i) => {
        let r = getComputedStyle(document.querySelector(':root'));
        let globalPaddingY = parseInt(r.getPropertyValue('--sectionPaddingY'));

        gsap.set(element, {
            'will-change': 'transform, opacity',
            opacity: 0,
            yPercent: 15,
        });

        const batchElements = element.parentNode.querySelectorAll('.difference-content-item');

        ScrollTrigger.matchMedia({
            '(max-width: 767px)': () => {
                ScrollTrigger.batch(batchElements, {
                    id: 'reveal-batch-on-scroll',
                    start: () => `top bottom-=${globalPaddingY * 0.5}`,
                    end: () => `bottom top+=${globalPaddingY * 0.5}`,
                    invalidateOnRefresh: true,
                    onEnter: (batch) => animateIn(batch),
                });
            },
        });
    });
};

// Tabs
const tabsSection = () => {
    gsap.registerPlugin(ScrollTrigger);

    const scroller = document.querySelector('.scrollTrigger-scroller');

    // Add event listeners to tab navigation links
    const tabLinks = document.querySelectorAll('.tab-navigation-link');
    const tabItems = document.querySelectorAll('.tab-item');

    let isSwitching = false, // Flag to track if a tab switch is in progress
        hasScrollTrigger = false;

    let scrollTrigger; // Variable to hold the ScrollTrigger instance

    // Function to update ScrollTrigger's progress
    const updateScrollTriggerProgress = (tabIndex) => {
        if (window.innerWidth < 1024) {
            return;
        }
        if (scrollTrigger) {
            const scrollToPoint = scrollTrigger.start + (tabIndex * ((scrollTrigger.end - scrollTrigger.start) / tabItems.length));
            scrollTrigger.scroll(scrollToPoint + 40);
        }
    };

    const switchTabWithAnimation = (tabIndex) => {
        const selectedTab = tabItems[tabIndex];
        const selectedNavItem = tabLinks[tabIndex];

        if (!selectedTab.classList.contains('active')) {
            if (isSwitching) return; // Do not switch if already in the middle of switching

            isSwitching = true; // Set the flag

            tabLinks.forEach((link) => {
                link.classList.remove('active');
            });

            selectedNavItem.classList.add('active');

            tabItems.forEach((item, i) => {
                const tl = gsap.timeline({paused: true, ease: 'ease.out'});

                tl.to(item, {
                    duration: 0.4,
                    opacity: 0,
                }).to(item.querySelector('.content'), {
                    duration: 0.4,
                    scale: 0.95,
                }, '<').to(item.querySelector('.media'), {
                    duration: 0.4,
                    scale: 0.95,
                    onComplete: () => {
                        gsap.set(gsap.utils.toArray(tabItems), {
                            display: 'none'
                        });

                        gsap.set(selectedTab, {
                            clearProps: 'display'
                        });

                        if (window.innerWidth > 1023) {
                            document.querySelector('.tab-container').style.minHeight = document.querySelectorAll('.tab-item')[tabIndex].querySelector('.layout').clientHeight + 40 + 'px';
                            ScrollTrigger.getById('tabScroller').refresh();
                        }

                        item.classList.remove('active');

                        selectedTab.classList.add('active');

                        gsap.set(selectedTab.querySelector('.content'), {xPercent: -5, scale: 1});
                        gsap.set(selectedTab.querySelector('.media'), {xPercent: 5, scale: 1});

                        const tl = gsap.timeline({paused: true, ease: 'ease.out'});

                        const activeLottie = item.querySelector('.lottie-animation-container');

                        tl.to(selectedTab, {
                            duration: 0.2,
                            opacity: 1,
                        }).to(selectedTab.querySelector('.content'), {
                            duration: 0.2,
                            xPercent: 0,
                        }, '<').to(selectedTab.querySelector('.media'), {
                            duration: 0.2,
                            xPercent: 0,
                        }, '<');

                        tl.play();

                        activeLottie.lottieAnimation?.goToAndPlay(0);

                        isSwitching = false;
                    }
                }, '<');

                tl.play();
            });
        }
    };

    // Modify the click event listener for tabLinks
    tabLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            updateScrollTriggerProgress(index);
            if (window.innerWidth >= 1024) {
                return;
            }
            switchTabWithAnimation(index);
        });
    });

    const offset = () => {
        let r = getComputedStyle(document.querySelector(':root'));
        let globalPaddingY = parseInt(r.getPropertyValue('--sectionPaddingY'));

        return scroller.querySelector('.shared-heading').clientHeight + globalPaddingY;
    };

    const createScrollTrigger = () => {
        return new Promise((resolve, reject) => {
            ScrollTrigger.matchMedia({
                '(min-width: 1024px)': () => {
                    scrollTrigger = ScrollTrigger.create({
                        trigger: scroller,
                        id: 'tabScroller',
                        start: () => `top+=${offset() - document.querySelector('header').clientHeight}px center-=${offset()}px`,
                        end: () => `top+=${(window.innerHeight * tabItems.length)}px center`,
                        pin: true,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            if (isSwitching) return;

                            // Calculate the current tab index based on the scroll position
                            let tabIndex = Math.floor(self.progress * tabItems.length);

                            tabIndex = Math.min(tabItems.length - 1, tabIndex); // Ensure it doesn't exceed the number of tabs

                            // Switch to the new tab
                            switchTabWithAnimation(tabIndex);

                            ScrollTrigger.getAll().forEach((st) => {
                                if (!st.trigger.classList.contains('tab-container') && !st.trigger.classList.contains('tab-navigation')) {
                                    st.refresh();
                                }
                            });
                        },
                    });
                }
            });

            hasScrollTrigger = true;
            resolve();
        });
    };

    // Initially show the first tab
    switchTabWithAnimation(0);

    // Return the promise from createScrollTrigger
    return createScrollTrigger();
};

// Load Lottie animation for a single element
const handleLottieAnimations = async () => {
    const animationContainers = document.querySelectorAll('.lottie-animation-container');

    for (const container of animationContainers) {
        const jsonFile = container.getAttribute('data-animation-json');
        const animation = await loadLottie(jsonFile, container);

        container.lottieAnimation = animation;

        if (animation) {
            // ScrollTrigger.create({
            //     trigger: container,
            //     start: 'top center',
            //     end: 'bottom center',
            //     onEnter: () => animation.play(),
            // });
        }
    }
};
