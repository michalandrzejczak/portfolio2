import { TweenMax } from 'gsap';
import * as ScrollMagic from 'ScrollMagic';

$(function () {
	
	const ScrollMagic = require("scrollmagic");
	const controller = new ScrollMagic.Controller({addIndicators: true});

	var horizontalSlide1 = new TimelineMax()
	.to("#js-slider1", 1,   {x: "-50%"})	


 	// first horizontal section
	new ScrollMagic.Scene({
		triggerElement: "#js-pin1-wrapper",
		triggerHook: "onLeave",
		duration: "200%"
	})
		.setPin("#js-pin1-wrapper")
		.setTween(horizontalSlide1)
		.addIndicators()
		.addTo(controller);



});