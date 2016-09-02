<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<script type="text/javascript"
	src="<c:url value='/resources/js/drawer.js'/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/voter.css'/>">
<title>Invalid voter</title>
</head>
<body onLoad="init()">
	<div class="wrap">
		<div class="topBox">
			<h2>Select pencil color:</h2>
			<input type="color" name="pencilcolor" id="pencilColorPicker"
				value="#FF0000" onchange="updatePencilColor(event)">
		</div>
		<div class="topBox">
			<h2>Select pencil width:</h2>
			<input type="number" name="pencilwidth" id="pencilWidthInput"
				onchange="updatePencilWidth(event)" min="1" max="50" value="10"
				width="30px">
		</div>
		<button id="clearBtn" onclick="clearContent();">Clear</button>
		<canvas id="drawingArea" onmousemove="updateMouseCoordinates(event)"
			onmousedown="mouseButtonPressed(event)"
			onmouseup="mouseButtonReleased(event)"
			onmouseleave="mouseLeaved(event)"></canvas>
	</div>
</body>
</html>