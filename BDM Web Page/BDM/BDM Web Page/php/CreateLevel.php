<?php

require "Functions.php";

$fk_course = $_GET['fk_course'];
$level_index = $_GET['level_index'];
$level_cost = $_GET['level_cost'];
$video = "";
$document = $_FILES['docx'];
$description = $_GET['description'];


$json = [];
$json["ID"] = CreateLevel($fk_course, $level_index, $level_cost, $video, $description);
$json["fileID"] = InsertFile($json["ID"], $_FILES['docx']['tmp_name']);
echo json_encode($json);