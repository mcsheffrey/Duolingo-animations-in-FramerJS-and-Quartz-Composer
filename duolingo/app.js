// Hello, welcome to your new Framer project. This is where you should 
// start coding. Feel free to remove all of this code.
// 
// Just to rehash: Framer just converted all your layer groups into framer
// views. Just drop index.html (next to this file) on your browser to see
// the result. Every view is available under the global PSD object, so if you
// had a layer group called MyPhoto you can find it under PSD["MyPhoto"].
// 
// You can safely re-run the Framer app any time and this code will stay 
// intact. Framer will only update the graphics.
// 
// Some links that could come in handy:
// 
// 	- Docs: 	http://www.framer.com/documentation
// 	- Examples: http://www.framer.com/examples


// ==============================================================
// Example: bounce all the views!


// Simple reusable function that binds a bounce to a click on a view
// function bounceOnClick(view) {
	
// 	// If the view is a normal view (not a scrollview)
// 	if (view instanceof View) {
		
// 		// Listen to a click event
// 		view.on("click", function(event) {
			
// 			// Stop sending the click event to underlying views after this
// 			event.stopPropagation()
			
// 			// "Wind up" the spring
// 			view.scale = 0.7
			
// 			// And scale back to full size with a spring curve
// 			view.animate({
// 				properties:{scale:1.0},
// 				curve: "spring(1000,15,500)"
// 			})
// 		})
// 	}
// }


// // Loop through all the exported views
// for (var layerGroupName in PSD) {
// 	bounceOnClick(PSD[layerGroupName]);
// }
// 

// Settings
animateSpeed = "500";
animateCurveSpeed = "200";
animateInCurve = "spring(400,30,200)";
animateOutCurve = animateInCurve;
animateOrigin = "50% 50%";
homeCardBorder = "1px solid rgba(0,0,0,.2)";
homeCardShadowSize = "0 1px 2px rgba(0,0,0,.2)";
homeTrafficScale = ".953";
homeTrafficY = "960";
homeMovieScale = ".92";
homeMovieY = "927";
homeTimeScale = ".88";
homeTimeY = "946";
nowTrafficY = "298";
nowMovieY = "795";
nowTimeY = "1380";
nowCardBorder = "1px solid transparent";
nowCardShadowSize = "0 1px 1px rgba(0,0,0,.2)";

// view1 = new View({x:250, y:110, width:145, height:145});

// view1.style = {
//     "background-color": "#12a6eb",
//     "border-radius": "100%",
//     "color": "white",
//     "font": "40px Monaco",
//     "text-align": "center",
//     "line-height": "275px",
//     "z-index": 100
// }
// 
// 



PSD["Header"].opacity = 0;
PSD["Header"].y = -100;
PSD["BlueBg"].opacity = 0;

PSD["Cards"].opacity = 0;
PSD["Cards"].y = 700;
PSD["Egg"].style["z-index"] = 1000;
PSD["Egg"].scale = .35;
PSD["Egg"].y = 55;

clipView = new View({
	x:0, 
	y:0, 
	width:640, 
	height:1096
});
clipView.addSubView(PSD["BlueBg"]);
clipView.clip = true;
clipView.index = 100;

// Animate to Now View
gotoNow = function() {
	
	PSD["CircleBig"].animate({
		properties: {
			scale: 14
		},
		curve: animateInCurve,
		time: animateCurveSpeed
	});

	PSD["Egg"].animate({
		properties: {
			y: 150,
			scale: 1
		},
		curve: animateInCurve,
		time: animateCurveSpeed
	});

	PSD["Background"].animate({
		properties: {
			scale: .5,
			opacity: 0
		},
		curve: animateInCurve,
		time: animateCurveSpeed
	});

	utils.delay(100, function() {

		PSD["Header"].animate({
			properties: {
				y: 30,
				opacity: 1
			},
			curve: animateInCurve,
			time: animateCurveSpeed
		});

		PSD["Cards"].animate({
			properties: {
				y: 0,
				opacity: 1
			},
			curve: animateInCurve,
			time: animateCurveSpeed
		});
	});

	document.getElementsByTagName('body')[0].className = 'now';

};

// Animate back home
gotoHome = function() {

	PSD["Header"].animate({
		properties: {
			y: -100,
			opacity: 0
		},
		curve: animateInCurve,
		time: animateCurveSpeed
	});
	
	PSD["Cards"].animate({
		properties: {
			y: 700,
			opacity: 0
		},
		curve: animateInCurve,
		time: animateCurveSpeed
	});

	utils.delay(100, function() {

		PSD["CircleBig"].animate({
			properties: {
				scale: 1
			},
			curve: animateInCurve,
			time: animateCurveSpeed
		});
			
		PSD["Egg"].animate({
			properties: {
				y: 55,
				scale: .35
			},
			curve: animateInCurve,
			time: animateCurveSpeed
		});

		PSD["Background"].animate({
			properties: {
				scale: 1,
				opacity: 1
			},
			curve: animateInCurve,
			time: animateCurveSpeed
		});

	});

	


	document.getElementsByTagName('body')[0].className = 'home';
	
};

// Check device types
isIphone = function() {
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
		return true;
	}
};

isWebApp = function() {
	return window.navigator.standalone;
};

isSafari = function() {
	return navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 
};

// Set stage
// gotoHome();

// Check pointer types
pointerType = "click";

if (isIphone()) {
	pointerType = "touchstart";
} 

// Trigger animation on click/tap anywhere
toggler = utils.toggle(gotoNow, gotoHome);

clipView.on(pointerType, function(e) {
	var movePage;
	e.preventDefault();
	movePage = toggler();
	return movePage();
});

// Don't show status bar for web apps
// if (isWebApp()) {
// 	PSD["StatusBar"].opacity = 0
// } else {
// 	PSD["Background"].y += 40
// }

// Chrome and safari render webkit filters differently, adjust to turn logo white accordingly
if (isSafari() || isIphone()) {
	document.getElementsByTagName('html')[0].className = 'safari';
};