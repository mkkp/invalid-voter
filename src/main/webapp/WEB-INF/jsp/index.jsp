<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<script type="text/javascript"
	src="<c:url value='/resources/js/drawer.js'/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/voter.css'/>">
<title>�rv�nytelen szavaz�s gyakorl�</title>
</head>
<body onLoad="init()">
	<div id="header">
		<div class="topBox">
			<h2>V�laszd ki a tint�d sz�n�t:</h2>
			<input type="color" name="pencilColorPicker" id="pencilColorPicker"
				value="#FF0000" onchange="updatePencilColor(event)">
		</div>
		<div class="topBox">
			<h2>V�laszd ki a vonalvastags�got:</h2>
			<input type="number" name="pencilWidthInput" id="pencilWidthInput"
				onchange="updatePencilWidth(event)" min="1" max="50" value="5"
				width="30px">
		</div>
		<button id="clearBtn" onclick="clearContent();">T�rl�s</button>
		<button id="clearBtn" onclick="downloadImage();">Let�lt�s</button>
	</div>
	<canvas id="drawingArea" onmousemove="updateMouseCoordinates(event)"
		onmousedown="mouseButtonPressed(event)"
		onmouseup="mouseButtonReleased(event)"
		onmouseleave="mouseLeaved(event)"></canvas>
</body>
</html>