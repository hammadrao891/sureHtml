import '../../scss/pages/partners.scss';

// GSAP
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {loadLottie} from '../utils/loadLottie';

document.addEventListener('DOMContentLoaded', () => {
    tabsSection();
    handleLottieAnimations();
});

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
                            xPercent: 0
                        }, '<');

                        tl.play();

                        activeLottie.lottieAnimation.goToAndPlay(0);

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

    function hasParentWithClass(element, className) {
        while (element) {
            element = element.parentElement;
            if (!element) break; // If no parent element exists, exit the loop
            if (element.classList.contains(className)) {
                return true; // Found the parent with the specified class
            }
        }
        return false; // No parent with the specified class was found
    }

    const createScrollTrigger = () => {
        return new Promise((resolve, reject) => {
            ScrollTrigger.matchMedia({
                '(min-width: 1024px)': () => {
                    scrollTrigger = ScrollTrigger.create({
                        trigger: scroller,
                        id: 'tabScroller',
                        start: () => `top top-=${offset() + 40 - document.querySelector('header').clientHeight}px`,
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
