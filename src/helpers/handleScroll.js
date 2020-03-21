import $ from "jquery";
import throttle from "lodash.throttle";

let lastScrollY = 0;


export const handleScroll = throttle(() => {
    const currentScrollY = $(window).scrollTop();

    if (currentScrollY + 10 < lastScrollY) {
        $('header').addClass('fixedHeader')
    }
    if (currentScrollY - 10 > lastScrollY) {

        $('header').removeClass('fixedHeader')
    }
    if (currentScrollY === 0) {
        $('header').removeClass('fixedHeader')
    }

    lastScrollY = currentScrollY;
}, 100);