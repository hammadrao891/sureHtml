import '../../scss/pages/contact.scss';

// GSAP
import {gsap} from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
    mapMarkers();
});

const mapMarkers = () => {
    const markers = document.querySelectorAll('.map-markers .marker');
    const mobileMarkerCaption = document.querySelector('.mobile-marker-caption');

    let opened = null;

    const showMarker = (marker) => {
        const caption = marker.children[0];

        caption.classList.toggle('active');

        if (caption.classList.contains('active')) {
            if (window.innerWidth > 767) {
                gsap.to(caption, {
                    duration: 0.2,
                    display: 'block',
                    opacity: 1,
                    y: 0,
                });
            }

            mobileMarkerCaption.innerHTML = caption.innerHTML;
        } else {
            if (window.innerWidth > 767) {
                gsap.to(caption, {
                    duration: 0.2,
                    opacity: 0,
                    y: 10,
                    onComplete: () => {
                        gsap.to(caption, {
                            display: '',
                        });
                    }
                });
            }
        }
    };

    const checkIfOpened = (marker) => {
        const caption = marker.children[0];

        if (caption.classList.contains('active')) {
            if (window.innerWidth > 767) {
                gsap.to(caption, {
                    duration: 0.2,
                    display: 'block',
                    opacity: 1,
                    y: 0,
                });
            }

            mobileMarkerCaption.innerHTML = caption.innerHTML;

            opened = marker; // if any cards are opened by default assign accordingly
        }
    };

    const bindClickEvents = (e) => {
        let isMarkerClicked = false;

        markers.forEach((marker) => {
            if (marker.contains(e.target)) {
                handleClick(e.target);
                isMarkerClicked = true;
            }
        });

        // If click is outside markers and there is an opened caption, close it
        if (window.innerWidth > 767) {
            if (!isMarkerClicked && opened) {
                showMarker(opened);
                opened = null;
            }
        }
    };

    const handleClick = (e) => {
        const clickedItem = e;

        // initially show clicked item
        showMarker(clickedItem);

        if (!opened) {
            // update opened var
            opened = clickedItem;
        } else if (opened === clickedItem) {
            // update opened var
            opened = null;
        } else {
            // close previously opened siblings
            showMarker(opened);
            // update opened var
            opened = clickedItem;
        }
    };

    markers.forEach((marker) => checkIfOpened(marker)); // check if any cards are opened
    document.addEventListener('click', bindClickEvents, false);
};
