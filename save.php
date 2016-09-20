<?php
$client_id    = "xxx";
$filteredData = substr($_POST['img'], strpos($_POST['img'], ",") + 1);
$body         = ['image' => $filteredData];

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://api.imgur.com/3/image.json');
curl_setopt($curl, CURLOPT_TIMEOUT, 30);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Client-ID ' . $client_id));
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
$out = curl_exec($curl);
curl_close($curl);
$result = json_decode($out, true);

header('Content-Type: application/json');
echo json_encode(
	[
		'id'   => $result['success'] ? $result['data']['id'] : null,
		'link' => $result['success'] ? $result['data']['link'] : null,
	]
);