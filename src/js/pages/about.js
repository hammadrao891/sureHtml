import '../../scss/pages/about.scss';

// GSAP
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Load Prism Lottie
import {loadLottie} from '../utils/loadLottie';

// Video Modal
import {videoModal} from '../utils/videoModal';

document.addEventListener('DOMContentLoaded', () => {
    handleLottieAnimations().then(r => {});
    ourLeadership();
    tooltip();
    videoModal();
});

// Load Lottie animation for a single element
const handleLottieAnimations = async () => {
    const animationContainers = document.querySelectorAll('.lottie-animation-container');

    for (const container of animationContainers) {
        const jsonFile = container.getAttribute('data-animation-json');
        const animation = await loadLottie(jsonFile, container);

        if (animation) {
            ScrollTrigger.create({
                trigger: container,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => animation.play(),
            });
        }
    }
};

// Graphic
const ourLeadership = () => {
    const graphicTrigger = document.querySelector('.our-leadership-graphic');
    const hexagon = document.querySelectorAll('.our-leadership-graphic .hexagon');
    const persons = document.querySelectorAll('.our-leadership-graphic .person');
    const tooltip = document.querySelector('.our-leadership-graphic .tooltip');

    gsap.set(gsap.utils.toArray(persons), {
        opacity: 0,
        scale: 0.75
    });

    gsap.set(tooltip, {
        opacity: 0
    });

    gsap.set(hexagon, {
        opacity: 0,
        scale: 0
    });

    const duration = 0.5;
    const ease = 'expo.out';

    // Create a GSAP timeline
    const tl = gsap.timeline({paused: true});

    tl.to(hexagon, {opacity: 1, scale: 1, duration: duration, ease: ease});

    tl.to(persons[0], {opacity: 1, scale: 1, duration: duration, ease: ease});

    tl.to(tooltip, {opacity: 1, duration: duration, ease: ease});

    for (let index = 1; index < 6; index++) {
        tl.to(persons[index], {opacity: 1, scale: 1, duration: duration, ease: ease}, `>-25%`);
    }

    // Use ScrollTrigger to trigger the animation when scrolling to the "technology-sphere-graphic" element
    ScrollTrigger.create({
        trigger: graphicTrigger,
        id: 'leadershipGraphic',
        start: 'top center', // Adjust the starting point as needed
        end: 'top center', // Adjust the starting point as needed
        animation: tl,
        // markers: true, // Display markers for debugging (you can remove this in production)
        toggleActions: 'play none none none', // Define toggle actions for the trigger
    });
};

// Custom tooltip
const tooltip = () => {
    // Create the tooltip element and append it to body
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    gsap.set(tooltip, {
        opacity: 0
    });

    // Function to update tooltip position and content
    const updateTooltip = (e, content) => {
        tooltip.innerHTML = content;

        gsap.to(tooltip, {
            duration: 0.2,
            opacity: 1
        });

        // Ensure the tooltip does not exceed the screen width
        let tooltipWidth = tooltip.offsetWidth;
        let tooltipHeight = tooltip.offsetHeight;
        let posX = e.pageX + 20; // Offset cursor position for X
        let posY = e.pageY - window.scrollY + 20; // Offset cursor position for Y

        // Adjust if tooltip exceeds the window width
        if (posX + tooltipWidth > window.innerWidth - 30) {
            posX = window.innerWidth - tooltipWidth - 30;
        }
        // Adjust if tooltip exceeds the window height
        if (posY + tooltipHeight > window.innerHeight - 20) {
            posY = window.innerHeight - tooltipHeight - 20;
        }

        tooltip.style.left = posX + 'px';
        tooltip.style.top = posY + 'px';
    }

    // Function to hide tooltip
    const hideTooltip = () => {
        gsap.to(tooltip, {
            duration: 0.2,
            opacity: 0
        });
    }

    // Attach event listeners to elements with the tooltip-target class
    const targets = document.querySelectorAll('.js-tooltip');
    targets.forEach((target) => {
        target.addEventListener('mouseover', (e) => {
            const content = e.currentTarget.querySelector('.js-tooltip-content').innerHTML;
            updateTooltip(e, content);
        });

        target.addEventListener('mousemove', (e) => {
            updateTooltip(e, e.currentTarget.querySelector('.js-tooltip-content').innerHTML);
        });

        target.addEventListener('mouseout', hideTooltip);
    });
};