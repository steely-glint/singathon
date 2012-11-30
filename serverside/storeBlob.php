<?php
include_once 'data/DataPool.php';
include_once 'data/DataHolder.php';

// The room ID: GET: [url]?r=...
$roomId = ereg_replace("[^0-9]","",$_GET['r']);
// The owner: remote IP-address.
$owner = $_SERVER['REMOTE_ADDR'];
// The blob: POST: blob=...
$blob = $_POST['blob'];

// Print 0 and die if input is invalid
if ( strlen($roomId) == 0 || $roomId !== $_GET['r'] || strlen($blob) == 0 )
	die("0");

// Setup data holder.
$data = new DataHolder($blob, $owner, $roomId);

// Print 1 if data was successfully added, 0 if not.
if ( DataPool::getInstance()->addData($data) )
	die("1");
else
	die("0");
?>