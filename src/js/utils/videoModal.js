import {gsap} from 'gsap';

export const videoModal = () => {
    const trigger = document.querySelectorAll('.js-video-modal');
    const body = document.body;

    let tl,
        modal,
        modalContent;

    function playVimeo(player) {
        player.play().then(function () {
            console.log('Video is playing');
        }).catch(function (error) {
            console.error('Error playing the video:', error.name);
        });
    }

    const setModalContent = (element) => {
        element.video = element.querySelector('.js-video > *');

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
        modalLayoutVideo.classList.add('f-modal-video');

        // set content from the target element
        modalLayoutVideo.innerHTML = `${element.video.outerHTML}`;

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
            onComplete: () => {
                const HTML5Video = modalContent.querySelector('.f-modal-video video');

                if (HTML5Video) {
                    HTML5Video.play();
                } else {
                    const iframe = modalContent.querySelector('.f-modal-video iframe');
                    const player = new Vimeo.Player(iframe);

                    playVimeo(player);
                }
            }
        });

        tl.play();
    };

    function handleClick(e) {
        e.preventDefault();
        const target = e.currentTarget;

        if (target.classList.contains('js-customer-testimonial') && target.parentNode.classList.contains('active')) {
            setModalContent(target);
        } else if (!target.classList.contains('js-customer-testimonial')) {
            setModalContent(target);
        }
    }

    // bind on click
    trigger.forEach(element => {
        element.addEventListener('click', handleClick);
    });

    function checkAndRemoveListeners() {
        if (window.innerWidth > 1024) {
            trigger.forEach(element => {
                element.removeEventListener('click', handleClick);
            });
        }
    }

    // close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (modal && modal.contains(e.target) && !modalContent.contains(e.target)) {
            tl.reverse();
        }
    });
};