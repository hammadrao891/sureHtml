import '../../scss/pages/teams.scss';

// Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// GSAP
import Swiper from 'swiper';
import {Autoplay} from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    heroCarousel();
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
