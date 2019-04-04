import {TweenMax} from 'gsap';
import * as ScrollMagic from 'ScrollMagic';

$(function () {
    let isWidthDesktop,
        isScrollMagicMounted = false;

    const checkWindowWidth = () => {
        if (window.innerWidth > 768) {
            isWidthDesktop = true;
        } else {
            isWidthDesktop = false;
        }
    }

    const mountScrollMagic = () => {
        if (isWidthDesktop && !isScrollMagicMounted) { // mounting ScrollMagic for desktop width
            const ScrollMagic = require("scrollmagic");
            var controller = new ScrollMagic.Controller();

            const horizontalSlide1 = new TimelineMax().to("#js-slider1", 1, { x: "-50%" });
            const horizontalSlide2 = new TimelineMax().to("#js-slider2", 1, { x: "-50%" });

            isScrollMagicMounted = true;

            // first horizontal section
            var scene1 = new ScrollMagic.Scene({
                triggerElement: "#js-pin1-wrapper",
                triggerHook: "onLeave",
                duration: "200%"
            }).setPin("#js-pin1-wrapper")
                .setTween(horizontalSlide1)
                .addTo(controller);

            // second horizontal section
            var scene2 = new ScrollMagic.Scene({
                triggerElement: "#js-pin2-wrapper",
                triggerHook: "onLeave",
                duration: "200%"
            }).setPin("#js-pin2-wrapper")
                .setTween(horizontalSlide2)
                .addTo(controller);
        } else if (isWidthDesktop && isScrollMagicMounted) { // doing nothing if width is still desktopish but ScrollMagic already mounted
            return false
        } else { // if width <= 768px unmount ScrollMagic
            controller = null;
            scene1 = null;
            scene2 = null;
            isScrollMagicMounted = false;
            return false;
        }
    }

    checkWindowWidth(); // initial check of window size
    mountScrollMagic(); // initial check on ScrollMagic mounting

    let timeout = false; // debouncing helper
    const windowWidth = window.innerWidth; // checking only vertical window resize helper

    window.addEventListener("resize", () => {
        if (window.innerWidth == windowWidth) return;

        if (!timeout) {
            timeout = true;
            document.location.reload(true);
            checkWindowWidth();
            mountScrollMagic();
            setTimeout(() => {
                timeout = false;
            }, 500)
        }
    })
});