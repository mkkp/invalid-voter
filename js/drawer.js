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

function init() {
	drawingCanvas = document.getElementById("drawingArea");
	drawingContext = drawingCanvas.getContext("2d");

	stickerCanvas = document.getElementById("stickerArea");
	stickerContext = stickerCanvas.getContext("2d");

	canvasContainer = document.getElementById("canvasContainer");

	drawBackground();

	//drawStickers();

	setCursorByID("drawingArea", "crosshair");

	setCursorByID("draggable", "move");

	setLineWidth();
	setColor();

	addEventsToDrawingCanvas();

	addEventsToStickerCanvas();
}

function drawBackground() {
	background = new Image();
	background.src = "./images/szavazolap.png";

	background.onload = backgroundLoaded;
}

function drawStickers() {
	var logo = new Image();
	logo.onload = logoLoaded;
	logo.src = "./images/logo.png";
	var logoSticker = {
		image : logo,
		x : 10,
		y : 0,
		alt : "Magyar Kétfarkú Kutya Párt"
	};
	var menyet = new Image();
	menyet.onload = menyetLoaded;
	menyet.src = "./images/menyet.png";
	var menyetSticker = {
		image : menyet,
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
	stickerCanvas.height = background.height;
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
	stickerContext.drawImage(stickers[id].image, stickers[id].x, stickers[id].y, stickers[id].image.width, stickers[id].image.height);
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

function updateStickerCoordinates(event) {
	if (isDragging) {

	}
}

function pickUpSticker(event) {
	isDragging = true;
}

function releaseSticker(event) {
	isDragging = false;
}

function saveActualPosition(event) {
	var rect = drawingCanvas.getBoundingClientRect();
	console.log(event.clientX + " " + rect.left + " " + event.clientY + " " + rect.top);
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
	drawingCanvas.toBlob(publishOnFacebook, "image/png", 1);
}

function publishOnFacebook(blob) {
	FB.ui(
		{
			method : "feed",
			name : "Érvénytelen szavazat",
			display : "popup",
			link : "",
			picture : URL.createObjectURL(blob),
			description : "Egy érvénytelen szavazat!"
		}
	);
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}