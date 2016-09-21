<?php

header('Content-Type: application/json');

$target_dir = "uploads";

$returnValue = array(
	'success' => false,
	'imageID' => 0,
	'errorMsg' => ""
);

if(isset($_POST["image"])) {
	$filename = md5(time().uniqid());

	$base64data = explode(',', $_POST["image"]);

	if($base64data[0] == "data:image/png;base64") {
		$decodedPNG = base64_decode($base64data[1]);
		if(strlen($decodedPNG) < 500000) {
			file_put_contents($target_dir . "/" . $filename . ".png", $decodedPNG);
			$returnValue["success"] = true;
			$returnValue["imageID"] = $filename;

			// Tell FB to scrape the page so the image will appear in the share preview
			exec('curl -X POST -F "id=http://ketfarkukutya.com/invalid-voter/?image=' . $filename . '" -F "scrape=true" "https://graph.facebook.com/"');
			echo json_encode($returnValue);
		}
		else {
			$returnValue["errorMsg"] = "This file is bigger than 500 KB.";
			echo json_encode($returnValue);
		}
	}
	else {
		$returnValue["errorMsg"] = "This is not a PNG image.";
		echo json_encode($returnValue);
	}
}

?>