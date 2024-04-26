import '../../scss/pages/leadership.scss';

// GSAP
import {gsap} from 'gsap';

// Lottie
import lottie from 'lottie-web';

// JSON
import Hexagon from 'img/leadership/lottie/05_hexagon.json';

document.addEventListener('DOMContentLoaded', () => {
    teamModal();
});

// Modal
const teamModal = () => {
    const trigger = document.querySelectorAll('.js-member-modal');
    const body = document.body;

    let tl,
        modal,
        modalClose,
        modalContent,
        lottieHexagon,
        modalHexagon;

    const setModalContent = (element) => {
        // create lottie hexagon div
        modalHexagon = document.createElement('div');
        modalHexagon.classList.add('modal-lottie');

        lottieHexagon = lottie.loadAnimation({
            container: modalHexagon,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: Hexagon,
            rendererSettings: {
                scaleMode: 'noScale', clearCanvas: false, progressiveLoad: true, hideOnTransparent: true
            },
        });

        // create master modal div
        modal = document.createElement('div');
        modal.classList.add('f-modal');

        // create modal divs
        modalClose = document.createElement('div');
        const modalContent = document.createElement('div');
        const memberLayout = document.createElement('div');

        // add classes to modal divs
        modalClose.classList.add('f-modal-close');
        modalContent.classList.add('f-modal-content');
        memberLayout.classList.add('member-layout');

        // assemble modal divs
        modal.append(modalContent);
        memberLayout.append(modalClose);
        modalContent.append(memberLayout);

        // create member layout divs
        const memberLayoutPhoto = document.createElement('div');
        const memberLayoutContent = document.createElement('div');
        const memberLayoutScrollable = document.createElement('div');

        // add classes to member layout divs
        memberLayoutPhoto.classList.add('photo');
        memberLayoutContent.classList.add('content');
        memberLayoutScrollable.classList.add('scrollable');
        memberLayoutScrollable.classList.add('js-scrollable');

        // set content from the target element
        memberLayoutPhoto.innerHTML = `
        ${element.querySelector('.photo').innerHTML}
        `;
        memberLayoutScrollable.innerHTML = `
        <div class="copy">
            <div class="content">
                ${element.querySelector('.name').outerHTML}
                ${element.querySelector('.job').outerHTML}
                <div class="buttons">
                    <a href="#" class="btn btn-link">
                        View LinkedIn
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17.3076L17 7.30762M17 7.30762H7M17 7.30762V17.3076" stroke="#131316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
                ${element.querySelector('.description').outerHTML}
            </div>
        </div>
        `;

        lottieHexagon.addEventListener('DOMLoaded', () => {
            memberLayoutPhoto.append(modalHexagon);
        });

        // assemble member layout
        memberLayout.append(memberLayoutPhoto);
        memberLayout.append(memberLayoutContent);
        memberLayoutContent.append(memberLayoutScrollable);

        document.body.append(modal); // append modal to body

        // animate opening modal
        openModal(element);
    };

    const openModal = (element) => {
        tl = gsap.timeline({reversed: true, pause: true});
        modalContent = modal.querySelector('.f-modal-content');

        modal.classList.add('open');

        tl.set(modalContent, {
            scale: 0.95,
            opacity: 0
        });

        tl.to(modal, {
            duration: 0.2,
            opacity: 1,
            onStart: () => {
                body.classList.add('overflow-hidden');
            },
            onReverseComplete: () => {
                body.classList.remove('overflow-hidden');
                modal.classList.remove('open');
                modal.remove();

                lottieHexagon.destroy();
            }
        }, '<+0.1').to(modalContent, {
            duration: 0.2,
            opacity: 1,
            scale: 1
        });

        tl.play();
    };

    // bind on click
    trigger.forEach(element => {
        element.addEventListener('click', e => {
            e.preventDefault();
            setModalContent(element);
        });
    });

    // close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (modal && modal.contains(e.target) && !modalContent.contains(e.target)) {
            tl.reverse();
        }

        if (modalClose && modalClose.contains(e.target)) {
            tl.reverse();
        }
    });
};