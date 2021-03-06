<?php
include_once 'data/DataPool.php';
include_once 'data/DataHolder.php';

// The room ID: GET: [url]?r=...
$roomId = preg_replace("[^0-9]","",$_GET['r']);

// Print 0 and die if input is invalid
if ( strlen($roomId) == 0 || $roomId !== $_GET['r'] )
	die("0");

// Fetch data
$dataArr = DataPool::getInstance()->getRoomData($roomId);

if ( count($dataArr) == 0 ) die("0");

// Assemble output
$json = "[";
foreach ( $dataArr as $data ) {
	$json .= $data->toJSON().",";
}
$json = substr($json, 0, -1)."]";

// Print output
echo $json;
?>