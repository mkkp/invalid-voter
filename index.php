<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<meta name="viewport" content="user-scalable=no">
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="hu_HU" />
	<meta property="og:title" content="Érvénytelen szavazás gyakorló" />
	<meta property="og:description" content="Itt gyakorolhatod az érvénytelen szavazást az október 2-i népszavazásra." />
	<?php
	if(isset($_GET['image']))
		echo '<meta property="og:image" content="http://ketfarkukutya.com/invalid-voter/uploads/' . $_GET['image'] . '.png" />';
	else
		echo '<meta property="og:image" content="http://ketfarkukutya.com/invalid-voter/images/szavazolap.png" />';
	?>
	<script type="text/javascript" src="./js/drawer.js"></script>
	<script type="text/javascript" src="./js/jquery-3.1.0.min.js"></script>
	<link rel="stylesheet" type="text/css" href="./css/voter.css">
	<link rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
		integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
		crossorigin="anonymous">
	<title>Érvénytelen szavazás gyakorló</title>
</head>
<body onLoad="init()">
	<section class="container">
		<div id="fb-root"></div>
		<div class="row col-md-12 toolbar">
			<b>Szín:</b> <input type="color" name="pencilColorPicker"
				id="pencilColorPicker" value="#FF0000"
				onchange="updatePencilColor(event)"> <b>Vonalvastagság:</b>
			<input type="number" name="pencilWidthInput" id="pencilWidthInput"
				onchange="updatePencilWidth(event)" min="1" max="50" value="3"
				width="30px">
			<button id="clearBtn" class="btn btn-danger"
				onclick="clearContent();">Törlés</button>
			<button id="downloadBtn" class="btn btn-success"
				onclick="downloadImage();">Letöltés</button>
			<button id="shareBtn" class="btn btn-primary"
				onclick="shareOnFacebook();">Megosztás</button>
		</div>
		<div class="row col-md-12 toolbar" id="canvasContainer">
			<canvas id="drawingArea"></canvas>
		</div>
	</section>
</body>
</html>