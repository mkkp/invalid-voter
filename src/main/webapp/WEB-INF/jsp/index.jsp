<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<script type="text/javascript"
	src="<c:url value='/resources/js/drawer.js'/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value='/resources/css/voter.css'/>">
<meta property="og:type" content="website" />
<meta property="og:title" content="Érvénytelen szavazás gyakorló<!" />
<meta property="og:description"
	content="Itt lehet gyakorolni az érvénytelen szavazást az október másodikai népszavazásra!" />
<meta property="og:image" content="" />
<meta property="og:image:width" content="624" />
<meta property="og:image:height" content="438" />
<title>Érvénytelen szavazás gyakorló!</title>
</head>
<body onLoad="init()">
	<div id="fb-root"></div>
	<div id="header">
		<div class="topBox">
			<h2>Válaszd ki a tintád színét:</h2>
			<input type="color" name="pencilColorPicker" id="pencilColorPicker"
				value="#FF0000" onchange="updatePencilColor(event)">
		</div>
		<div class="topBox">
			<h2>Válaszd ki a vonalvastagságot:</h2>
			<input type="number" name="pencilWidthInput" id="pencilWidthInput"
				onchange="updatePencilWidth(event)" min="1" max="50" value="5"
				width="30px">
		</div>
		<button id="clearBtn" onclick="clearContent();">Törlés</button>
		<button id="downloadBtn" onclick="downloadImage();">Letöltés</button>
		<div id="share" class="btn">
			<div class="fb-share-button" data-href="" data-layout="button"
				data-size="large" data-mobile-iframe="true">
				<a class="fb-xfbml-parse-ignore" target="_blank" href="">Megosztás</a>
			</div>
		</div>
	</div>
	<canvas id="drawingArea" onmousemove="updateMouseCoordinates(event)"
		onmousedown="mouseButtonPressed(event)"
		onmouseup="mouseButtonReleased(event)"
		onmouseleave="mouseLeaved(event)"></canvas>
</body>
</html>