var canvas;
var context;
var background;
var color;
var lineWidth;
var actualPosition = {
	x : 0,
	y : 0
};
var lastPosition = {
	x : 0,
	y : 0
};
var isDrawing = false;

function init() {
	canvas = document.getElementsByTagName('canvas')[0];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext("2d");

	drawBackground();

	setCursorByID("drawingArea", "crosshair");

	setLineWidth();
	setColor();
}

function drawBackground() {
	background = new Image();
	background.src = "resources/images/szavazolap.jpg";

	background.onload = backgroundLoaded;
}

function backgroundLoaded(event) {
	context.save();
	canvas.width = background.width;
	context.drawImage(background, 0, 0, background.width, background.height);
	context.restore();
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

function mouseButtonPressed(event) {
	saveActualPosition(event);
	isDrawing = true;
}

function mouseButtonReleased(event) {
	isDrawing = false;
}

function mouseLeaved(event) {
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
	actualPosition.x = event.clientX;
	actualPosition.y = event.clientY - canvas.offsetTop;
}

function draw() {
	context.save();
	context.lineJoin = "round";
	context.lineCap = "round";
	context.beginPath();
	context.moveTo(lastPosition.x, lastPosition.y);
	context.lineTo(actualPosition.x, actualPosition.y);
	context.strokeStyle = color;
	context.lineWidth = lineWidth;
	context.stroke();
	context.closePath();
	context.restore();
}

function setCursorByID(id, cursorStyle) {
	var elem;
	if (document.getElementById && (elem = document.getElementById(id))) {
		if (elem.style)
			elem.style.cursor = cursorStyle;
	}
}

function clearContent() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
}

function downloadImage(){
	link.href = document.getElementById(drawingArea).toDataURL();
    link.download = "ervenytelen_szavazat.jpg";
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