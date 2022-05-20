<?php

require "Functions.php";

$ID = $_POST["ID"];
$title = $_POST["title"];
$photo = $_FILES["photo"]["tmp_name"];
$description = $_POST["description"];

echo json_encode(UpdateCourse($ID, $title, $photo, $description));