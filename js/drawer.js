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

	if(typeof showImage !== "undefined") {
		$('.row').css('display', 'none');
		$('.imageview').css('display', 'block');
		$('.imageview-image img').attr('src', showImage);
		$('.imageview-close').click(function() {
			$('.row').css('display', 'block');
			$('.imageview').css('display', 'none');
		});
	}
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
	drawingCanvas.addEventListener("touchstart", startDrawing);
	drawingCanvas.addEventListener("touchmove", updateMouseCoordinates);
	drawingCanvas.addEventListener("touchstop", stopDrawing);
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
	actualPosition.x = (event.pageX || event.changedTouches[0].pageX) - rect.left;
	actualPosition.y = (event.pageY || event.changedTouches[0].pageY) - rect.top;
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

	var shareWindow = window.open("share.php", "Megosztás a Facebook-on", "width=560,height=610");

	var data = drawingCanvas.toDataURL("image/png");

	// POST the Base64 encoded PNG to the server
	$.post("api.php", {'image': data}, function(result) {
		if(result.success == true) {
			setTimeout(function() {	// Wait for FB to cache the image
				shareWindow.location = "https://www.facebook.com/dialog/share?app_id=1187765324579277&display=popup&href=http%3A%2F%2Fketfarkukutya%2Ecom%2Finvalid%2Dvoter%2F%3Fimage%3D" + result.imageID + "&redirect_uri=http%3A%2F%2Fketfarkukutya%2Ecom%2Finvalid%2Dvoter%2Fshare%2Ephp%3Fclosewindow";
			}, 3000);
		}
		else {
			console.log(result.errorMsg);
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
