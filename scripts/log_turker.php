<?php
header("access-control-allow-origin:https://*.qualtrics.com,");
header("access-control-allow-methods: POST, GET, PUT, DELETE, OPTIONS");
header("access-control-allow-headers: content-type, accept");
require 'webmt_config.php'; //gets $PATH and login info

$mysqli = new mysqli('localhost',$DB_USER,$DB_PW,$DB);
if ($mysqli->connect_errno){
	die("db connection failed: " . $mysqli->connect_errno);
}

$mTurkID = strtoupper( $mysqli->real_escape_string($_GET['mTurkID']) );
$subjID = strtoupper( $mysqli->real_escape_string($_GET['subjID']) );
$study = strtoupper( $mysqli->real_escape_string($_GET['study']) );
$gender = strtoupper( $mysqli->real_escape_string($_GET['gender']) );
$political_affiliation = strtoupper( $mysqli->real_escape_string($_GET['political_affiliation']) );

$stmt = $mysqli->prepare("INSERT INTO turkers(mTurkID, study, gender, political_affiliation, studyID) VALUES (?, ?, ?, ?, ?)")
	or die("Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error);
$stmt->bind_param('sssss', $mTurkID, $study, $gender, $political_affiliation, $subjID)
	or die('bind failed');
$stmt->execute() or die('bad execute')
	or die('execute failed');

$mysqli->close()
	or die('close failed');

echo "success=1";
