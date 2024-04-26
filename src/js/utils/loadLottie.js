import lottie from 'lottie-web';

export const loadLottie = async (jsonFile, containerElement) => {
    try {
        const response = await fetch(jsonFile);
        const data = await response.json();
        return lottie.loadAnimation({
            container: containerElement,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: data,
        });
    } catch (error) {
        console.error('Error loading Lottie animation:', error);
        return null;
    }
};