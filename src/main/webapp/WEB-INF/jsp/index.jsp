<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<script type="text/javascript"
	src="<c:url value='/resources/js/drawer.js'/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/voter.css'/>">
<meta property="og:type" content="website" />
<meta property="og:title" content="�rv�nytelen szavaz�s gyakorl�<!" />
<meta property="og:description"
	content="Itt lehet gyakorolni az �rv�nytelen szavaz�st az okt�ber m�sodikai n�pszavaz�sra!" />
<meta property="og:image" content="" />
<meta property="og:image:width" content="624" />
<meta property="og:image:height" content="438" />
<title>�rv�nytelen szavaz�s gyakorl�!</title>
</head>
<body onLoad="init()">
	<div id="fb-root"></div>
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
		<button id="downloadBtn" onclick="downloadImage();">Let�lt�s</button>
		<div id="share" class="btn">
			<div class="fb-share-button" data-href="" data-layout="button"
				data-size="large" data-mobile-iframe="true">
				<a class="fb-xfbml-parse-ignore" target="_blank" href="">Megoszt�s</a>
			</div>
		</div>
	</div>
	<canvas id="drawingArea" onmousemove="updateMouseCoordinates(event)"
		onmousedown="mouseButtonPressed(event)"
		onmouseup="mouseButtonReleased(event)"
		onmouseleave="mouseLeaved(event)"></canvas>
</body>
</html>