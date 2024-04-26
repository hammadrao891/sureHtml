import {gsap} from 'gsap';

export const types = {
    'fadeIn': [],
    'fadeInUp': [],
    'fadeInDown': [],
    'horizontalToLeft': [],
    'horizontalToRight': [],
    'scaleIn': [],
};

// handle revealObserver properties
const setElementProperties = () => {
    // set properties based on 'type'
    const setProperties = (e, type) => {
        switch (type) {
            case 'horizontalToRight':
                e.style.transform = 'translate3d(-30px, 0, 0)';
                e.style.opacity = '0';
                e.style.willChange = 'transform, opacity';
                break;
            case 'horizontalToLeft':
                e.style.transform = 'translate3d(30px, 0, 0)';
                e.style.opacity = '0';
                e.style.willChange = 'transform, opacity';
                break;
            case 'fadeInUp':
                e.style.transform = 'translate3d(0, 30px, 0)';
                e.style.opacity = '0';
                e.style.willChange = 'transform, opacity';
                break;
            case 'fadeInDown':
                e.style.transform = 'translate3d(0, -30px, 0)';
                e.style.opacity = '0';
                e.style.willChange = 'transform, opacity';
                break;
            case 'fadeIn':
                e.style.opacity = '0';
                e.style.willChange = 'opacity';
                break;
            case 'scaleIn':
                e.style.transform = 'scale(1.05)';
                e.style.opacity = '0';
                e.style.willChange = 'transform, opacity';
                break;
        }
    }

    // set properties to each element accordingly
    for (let type in types) {
        for (let elem of types[type]) {
            const elements = document.querySelectorAll(elem);

            elements.forEach((elm) => {
                setProperties(elm, type);
            });
        }
    }

    // initialize animations
    document.body.style.visibility = 'visible';
}

const initiateObserver = () => {
    setElementProperties(); // set revealObserver element properties

    const options = {
        threshold: 0.2, rootMargin: '0px 0px 0px 0px',
    };

    // properties
    let itemDelay = 0.2, itemDuration = 0.4, itemLoad = 0;

    const onEntry = (entry) => {

        itemLoad = 0;

        entry.forEach((change, i) => {

            if (change.isIntersecting) {
                itemLoad++;

                gsap.to(change.target, {
                    opacity: 1,
                    translateY: 0,
                    translateX: 0,
                    scale: 1,
                    ease: 'cubic-bezier(.19,1,.22,1)',
                    duration: itemDuration,
                    delay: itemLoad * itemDelay,
                    onStart: function () {
                        observer.unobserve(change.target);
                        change.target.style.willChange = 'transform, opacity'
                    },
                }).then(function () {
                    change.target.style.transform = '';
                    change.target.style.opacity = '';
                    change.target.style.willChange = '';
                });
            }
        });
    };

    // instantiate a new Intersection Observer
    let observer = new IntersectionObserver(onEntry, options);

    // function to merge all arrays into one
    const mergeArrays = (object) => {
        let transitions = [];

        for (let type in object) {
            for (let transition of object[type]) {
                transitions = transitions.concat(transition);
            }
        }

        return transitions;
    };

    // merge all elements
    const elementsList = mergeArrays(types);

    if (elementsList.length > 0) {
        // list of cards
        let elements = document.querySelectorAll(elementsList);

        // loop through all elements
        // pass each element to observe method
        for (let elm of elements) {
            observer.observe(elm);
        }
    }
}

export default initiateObserver;