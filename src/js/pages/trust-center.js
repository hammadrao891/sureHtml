import '../../scss/pages/trust-center.scss';

// Lottie
import {loadLottie} from '../utils/loadLottie';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

document.addEventListener('DOMContentLoaded', () => {
    handleLottieAnimations().then(r => {});
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
