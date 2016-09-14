var drawingCanvas;
var drawingContext;
var stickerCanvas;
var stickerContext;
var background;
var color;
var lineWidth;
var canvasContainer;
var actualPosition = {
	x : 0,
	y : 0
};
var lastPosition = {
	x : 0,
	y : 0
};
var stickers = [];
var isDrawing = false;
var isDragging = false;
var actualImagePosition = {
	x : 0,
	y : 0
}
var lastImagePosition = {
	x : 0,
	y : 0
}

function init() {
	drawingCanvas = document.getElementById("drawingArea");
	drawingContext = drawingCanvas.getContext("2d");

	//stickerCanvas = document.getElementById("stickerArea");
	//stickerContext = stickerCanvas.getContext("2d");

	canvasContainer = document.getElementById("canvasContainer");

	drawBackground();

	//drawStickers();

	setCursorByID("drawingArea", "crosshair");

	//setCursorByID("stickerArea", "move");

	setLineWidth();
	setColor();

	addEventsToDrawingCanvas();

	//addEventsToStickerCanvas();

	window.fbAsyncInit = function() {
		FB.init({
			appId : '1187765324579277',
			xfbml : true,
			version : 'v2.7'
		});
	};

	(function(d, s, id) {
		var js,
			fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}

function drawBackground() {
	background = new Image();
	background.src = "./images/szavazolap.png";

	background.onload = backgroundLoaded;
}

function drawStickers() {
	stickerCanvas.width = stickerCanvas.width;

	var logo = new Image();
	logo.onload = logoLoaded;
	logo.src = "./images/logo.png";
	var logoSticker = {
		image : logo,
		src : logo.png,
		x : 10,
		y : 0,
		alt : "Magyar Kétfarkú Kutya Párt"
	};

	var menyet = new Image();
	menyet.onload = menyetLoaded;
	menyet.src = "./images/menyet.png";
	var menyetSticker = {
		image : menyet,
		src : menyet.png,
		x : 10,
		y : 0,
		alt : "Savköpő menyét"
	};

	stickers = [ logoSticker, menyetSticker ];
}

function backgroundLoaded(event) {
	drawingContext.save();
	drawingCanvas.width = background.width;
	drawingCanvas.height = background.height;
	//stickerCanvas.height = background.height;
	drawingContext.drawImage(background, 0, 0, background.width, background.height);
	drawingContext.restore();
}

function logoLoaded(event) {
	stickerLoaded(0);
}

function menyetLoaded(event) {
	stickerLoaded(1);
}

function stickerLoaded(id) {
	stickerContext.save();
	if (stickers[id - 1]) {
		stickers[id].y = stickers[id - 1].y + stickers[id - 1].image.height + 5;
	}
	stickerContext.drawImage(stickers[id].image, stickers[id].x, stickers[id].y);
	stickerContext.restore();
}

function updatePencilColor(event) {
	setColor();
}

function updatePencilWidth(event) {
	setLineWidth();
}

function setLineWidth() {
	lineWidth = document.getElementById("pencilWidthInput").value;
}

function setColor() {
	color = document.getElementById("pencilColorPicker").value;
}

function addEventsToDrawingCanvas() {
	drawingCanvas.addEventListener("mousemove", updateMouseCoordinates);
	drawingCanvas.addEventListener("mousedown", startDrawing);
	drawingCanvas.addEventListener("mouseup", stopDrawing);
	drawingCanvas.addEventListener("mouseleave", stopDrawingMouseLeft);
}

function addEventsToStickerCanvas() {
	drawingCanvas.addEventListener("mousemove", updateStickerCoordinates);
	drawingCanvas.addEventListener("mousedown", pickUpSticker);
	drawingCanvas.addEventListener("mouseup", releaseSticker);
	drawingCanvas.addEventListener("mouseleave", releaseSticker);
}

function startDrawing(event) {
	saveActualPosition(event);
	isDrawing = true;
}

function stopDrawing(event) {
	isDrawing = false;
}

function stopDrawingMouseLeft(event) {
	isDrawing = false;
}

function updateMouseCoordinates(event) {
	if (isDrawing) {
		lastPosition.x = actualPosition.x;
		lastPosition.y = actualPosition.y;
		saveActualPosition(event);
		draw();
	}
}

function saveActualPosition(event) {
	var rect = drawingCanvas.getBoundingClientRect();
	actualPosition.x = event.clientX - rect.left;
	actualPosition.y = event.clientY - rect.top;
}

function draw() {
	drawingContext.save();
	drawingContext.lineJoin = "round";
	drawingContext.lineCap = "round";
	drawingContext.beginPath();
	drawingContext.moveTo(lastPosition.x, lastPosition.y);
	drawingContext.lineTo(actualPosition.x, actualPosition.y);
	drawingContext.strokeStyle = color;
	drawingContext.lineWidth = lineWidth;
	drawingContext.stroke();
	drawingContext.closePath();
	drawingContext.restore();
}

function updateStickerCoordinates(event) {
	if (isDragging) {
		//lastImagePosition.x = actualImagePosition.x;
		//lastImagePosition.y = actualImagePosition.y;
		//saveActualImagePosition(event);
		//drawImage();
	}
}

function saveActualImagePosition(event) {
	var rect = stickerCanvas.getBoundingClientRect();
	actualImagePosition.x = event.clientX - rect.left;
	actualImagePosition.y = event.clientY - rect.top;
}


function pickUpSticker(event) {
	isDragging = true;
}

function releaseSticker(event) {
	isDragging = false;
}

function drawImage(){
	
}

function setCursorByID(id, cursorStyle) {
	var elem;
	if (document.getElementById && (elem = document.getElementById(id))) {
		if (elem.style)
			elem.style.cursor = cursorStyle;
	}
}

function clearContent() {
	drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
	drawBackground();
}

function downloadImage() {
	drawingCanvas.toBlob(saveAs, "image/png", 1);
}

function saveAs(blob) {
	var url = URL.createObjectURL(blob);
	var a = document.createElement("a");
	a.setAttribute("href", url);
	a.setAttribute("download", "ervenytelen-szavazolap" + getRandomArbitrary(1, 99999) + ".png");
	a.setAttribute("type", "image/png");
	a.click();
	a.remove();
}

var keys = {
	37 : 1,
	38 : 1,
	39 : 1,
	40 : 1
};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll() {
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	}
	window.onwheel = preventDefault;
	window.onmousewheel = document.onmousewheel = preventDefault;
	window.ontouchmove = preventDefault;
	document.onkeydown = preventDefaultForScrollKeys;
}

function shareOnFacebook() {
	var data = canvas.toDataURL("image/png");
	try {
		blob = dataURItoBlob(data);
	} catch (e) {
		console.log(e);
	}
	FB.getLoginStatus(function(response) {
		console.log(response);
		if (response.status === "connected") {
			postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
		} else if (response.status === "not_authorized") {
			FB.login(function(response) {
				postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
			}, {
				scope : "publish_actions"
			});
		} else {
			FB.login(function(response) {
				postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
			}, {
				scope : "publish_actions"
			});
		}
	});
}

function postImageToFacebook(token, filename, mimeType, imageData, message) {
	var fd = new FormData();
	fd.append("access_token", token);
	fd.append("source", imageData);
	fd.append("no_story", true);

	// Upload image to facebook without story(post to feed)
	$.ajax({
		url : "https://graph.facebook.com/me/photos?access_token=" + token,
		type : "POST",
		data : fd,
		processData : false,
		contentType : false,
		cache : false,
		success : function(data) {
			console.log("success: ", data);

			// Get image source url
			FB.api(
				"/" + data.id + "?fields=images",
				function(response) {
					if (response && !response.error) {
						//console.log(response.images[0].source);

						// Create facebook post using image
						FB.api(
							"/me/feed",
							"POST",
							{
								"message" : "",
								"picture" : response.images[0].source,
								"link" : window.location.href,
								"name" : 'Look at the cute panda!',
								"description" : message,
								"privacy" : {
									value : 'SELF'
								}
							},
							function(response) {
								if (response && !response.error) {
									/* handle the result */
									console.log("Posted story to facebook");
									console.log(response);
								}
							}
						);
					}
				}
			);
		},
		error : function(shr, status, data) {
			console.log("error " + data + " Status " + shr.status);
		},
		complete : function(data) {
			//console.log('Post to facebook Complete');
		}
	});
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function dataURItoBlob(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	var blob = new Blob([ ab ], {
		type : mimeString
	});
	return blob;

}