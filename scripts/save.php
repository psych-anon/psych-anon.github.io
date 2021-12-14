<?php
	require 'webmt_config.php'; //gets $PATH
	$subjid = $_POST["subjid"];
	$studyName = $_POST["studyName"];
	$toWrite = $_POST["toWrite"];
	$name = $_POST["name"];
	$folder = $_POST["folder"];
	$suffix = $_POST["suffix"];
	$prefix = $_POST["prefix"];
	$filePath = "$PATH/responses/$studyName/$folder";
	//Write folder if it doesn't exist
	if (!file_exists($filePath))
	{
		mkdir($filePath,0777,True);
	}
	$fileName = "$filePath/$prefix$subjid$name$suffix.csv";
	file_put_contents("$fileName", $toWrite, FILE_APPEND);
?>
