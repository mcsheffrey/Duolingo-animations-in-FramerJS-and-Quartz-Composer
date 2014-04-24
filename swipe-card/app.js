
// Settings
animateSpeed = "475";
animateCurveSpeed = "200";
animateInCurve = "spring(300,25,10)";
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
var cardRotation;

PSD["Content"].dragger = new ui.Draggable(PSD["Content"]);

PSD["Content"].on(Events.DragMove, function() {
	console.log('x', PSD["Content"].x);
	console.log('y', PSD["Content"].y);
	PSD["Content"].rotation = -PSD["Content"].x/100

	cardRotation = -PSD["Content"].x/100;

});

PSD["Content"].dragger.on(Events.DragEnd, function() {
	if (PSD["Content"].x < -200) {
		PSD["Content"].animate({
		  properties: { rotation: cardRotation, x: -1000, y: -1000 },
		  curve: animateInCurve,
			time: animateCurveSpeed
		 });
	} else if (PSD["Content"].x > 400) {
		PSD["Content"].animate({
		  properties: { rotation: cardRotation, x: 1000, y: -1000 },
		  curve: animateInCurve,
			time: animateCurveSpeed
		 });
	} else {
		PSD["Content"].animate({
		  properties: {
		  	rotation: false, 
		  	x: 90, 
		  	y: 180 
		  },
		  curve: animateInCurve,
			time: animateCurveSpeed
		 });
	}
});