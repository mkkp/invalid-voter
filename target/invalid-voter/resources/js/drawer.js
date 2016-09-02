var canvas;
var context;

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

	setCursorByID("drawingArea", "crosshair");

	setLineWidth();
	setColor();

	drawBackground();
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

function drawBackground() {
	console.log("canvas params: " + canvas.width + " " + canvas.height);
	var image = new Image();
	image.onload = function() {
		context.drawImage(image, 0, 0);
	}
	image.src = "/invalid-voter/resources/images/bg.jpg";
	context.lineJoin = "round";
	context.lineCap = "round";
	context.save();
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
	if (document.getElementById &&
		(elem = document.getElementById(id))) {
		if (elem.style)
			elem.style.cursor = cursorStyle;
	}
}