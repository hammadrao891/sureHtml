import {gsap} from 'gsap';

export const customModal = () => {
    const trigger = document.querySelectorAll('.js-custom-modal-toggler');
    const body = document.body;

    let tl,
        modal,
        modalContent;

    const setModalContent = (element) => {
        element.content = document.querySelector(element.dataset.target);

        // create master modal div
        modal = document.createElement('div');
        modal.classList.add('f-modal');

        // create modal divs
        const modalClose = document.createElement('div');
        const modalContent = document.createElement('div');
        const modalLayout = document.createElement('div');

        // add classes to modal divs
        modalClose.classList.add('f-modal-close');
        modalContent.classList.add('f-modal-content');
        modalLayout.classList.add('f-modal-layout');

        // assemble modal divs
        modal.append(modalClose);
        modal.append(modalContent);

        // create member layout divs
        const modalLayoutVideo = document.createElement('div');

        // add classes to member layout divs
        modalLayoutVideo.classList.add('f-modal-custom');

        // set content from the target element
        modalLayoutVideo.innerHTML = `${element.content.innerHTML}`;

        // assemble member layout
        modalContent.append(modalLayoutVideo);

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
            }
        }, '<+0.1').to(modalContent, {
            duration: 0.2,
            opacity: 1,
            scale: 1,
        });

        tl.play();
    };

    function handleClick(e) {
        e.preventDefault();
        const target = e.currentTarget;

        setModalContent(target);
    }

    // bind on click
    trigger.forEach(element => {
        element.addEventListener('click', handleClick);
    });

    // close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (modal && modal.contains(e.target) && !modalContent.contains(e.target)) {
            tl.reverse();
        }
    });
};