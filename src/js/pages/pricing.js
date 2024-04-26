import '../../scss/pages/pricing.scss';

// GSAP
import {Expo, gsap} from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    quantityIncrementDecrement();
    // handleScrollSpy();
    pricingNavigation();
    handleCollapsibles();
});

// Quantity increment/decrement
const quantityIncrementDecrement = () => {
    const membersQuantity = document.querySelectorAll('.js-members-quantity');

    const incrementValue = (e) => {
        let membersQuantity = e.currentTarget.parentNode.parentNode.querySelector('.js-members-quantity');
        let value = parseInt(membersQuantity.value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        membersQuantity.value = value;
    };

    const decrementValue = (e) => {
        let membersQuantity = e.currentTarget.parentNode.parentNode.querySelector('.js-members-quantity');
        let value = parseInt(membersQuantity.value, 10);
        value = isNaN(value) ? 0 : value;
        value < 11 ? value = 11 : '';
        value--;
        if (value < 11) {
            membersQuantity.parentNode.classList.add('disable-decrement');
        }
        membersQuantity.value = value;
    };

    const checkValue = (membersQuantity) => {
        let value = parseInt(membersQuantity.value, 10);
        value = isNaN(value) ? 0 : value;
        value < 11 ? value = 11 : '';
        value--;
        if (value < 11) {
            membersQuantity.parentNode.classList.add('disable-decrement');
        }
        membersQuantity.value = value;
    };

    membersQuantity.forEach((element) => {
        checkValue(element);
    });

    const bindEventListeners = () => {
        membersQuantity.forEach((element) => {
            const increment = element.parentNode.querySelector('.js-increment');
            const decrement = element.parentNode.querySelector('.js-decrement');

            increment.addEventListener('click', incrementValue, false);
            decrement.addEventListener('click', decrementValue, false);
        });
    };

    bindEventListeners();
};

// Scroll spy
const handleScrollSpy = () => {
    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const navLink = document.querySelector(`.grid-nav .grid-nav-button[href="#${targetId}"]`);

                // Remove the active class from all navigation links
                document.querySelectorAll('.grid-nav .grid-nav-button').forEach(link => {
                    link.classList.remove('active');
                });

                // Add the active class to the corresponding navigation link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, {threshold: 0});

    // Observe each section
    const sectionsToObserve = document.querySelectorAll('.pricing-card');

    sectionsToObserve.forEach((section) => {
        observer.observe(section);
    });
};

// Pricing navigation show/hide filter
const pricingNavigation = () => {
    const pricingNavButtons = document.querySelectorAll('.grid-nav input[name="filter"]');
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingNavButtons.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            // Hide all content elements
            pricingCards.forEach((card) => {
                card.classList.remove('active');
            });

            if (pricingCards[index]) {
                pricingCards[index].classList.add('active');
            }
        });
    });
};

// Collapse/Expand features
const handleCollapsibles = () => {
    let opened = null;

    gsap.registerPlugin(Expo);

    const toggler = document.querySelectorAll('.js-toggle-features');

    const toggleVisibility = (e) => {
        let target = e.closest('.pricing-card').querySelector('.features-content');

        e.classList.toggle('active');

        if (e.classList.contains('active')) {
            target.classList.add('active');
            gsap.to(target, {
                duration: 0.4,
                ease: Expo.easeOut,
                height: target.scrollHeight
            });
        } else {
            target.classList.remove('active');
            gsap.to(target, {
                duration: 0.4,
                ease: Expo.easeOut,
                height: '0',
                onComplete: () => {
                    gsap.set(target, {
                        clearProps: 'all'
                    });
                }
            });
        }
    };

    const checkIfOpened = (e) => {
        let target = e.closest('.pricing-card').querySelector('.features-content');
        if (e.classList.contains('active')) {
            target.classList.add('active');
            gsap.to(target, {
                duration: 0.4,
                ease: Expo.easeOut,
                height: target.scrollHeight
            });
            opened = e; // if any cards are opened by default assign accordingly
        }
    };

    const updateHeight = () => {
        if (opened) {
            let target = opened.closest('.pricing-card').querySelector('.features-content');
            target.style.height = '';
            target.style.height = target.scrollHeight + 'px';
        }
    };

    window.addEventListener('resize', updateHeight);

    const handleCardCollapse = (e) => {
        const clickedItem = e;
        toggleVisibility(clickedItem);
        if (!opened) {
            opened = clickedItem;
        } else if (opened === clickedItem) {
            opened = null;
        } else {
            // close previously opened siblings
            toggleVisibility(opened);
            opened = clickedItem;
        }
    };

    const handleClick = (e) => {
        toggler.forEach((element) => {
            if (e.target === element || element.contains(e.target)) {
                e.preventDefault();
                handleCardCollapse(element);
            }
        });
    };

    toggler.forEach((el) => checkIfOpened(el)); // check if any cards are opened
    document.addEventListener('click', handleClick);
};