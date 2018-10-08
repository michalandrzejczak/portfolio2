import PerfectScrollbar from "perfect-scrollbar";

$(function(){

	let ps = new PerfectScrollbar(".projects-container"),
			projectsContainer = $(".projects-container");
	
	$(".arrow-left").click(function () { 
		let scrollPos = projectsContainer.scrollLeft();
		projectsContainer.stop().animate({scrollLeft: scrollPos-600}, 500);
	});
	
	$(".arrow-right").click(function () { 
		let scrollPos = projectsContainer.scrollLeft();
		projectsContainer.stop().animate({scrollLeft: scrollPos+600}, 500);
	});
})

