<?php
require "Functions.php";

$ID = $_GET["ID"];
$photo = $_FILES["photo"];

$insertDir = "lvl/".basename($photo["name"]);
$uploadDir = "../lvl/".basename($photo["name"]);
move_uploaded_file($photo["tmp_name"], $uploadDir);
// echo json_encode(UpdateLevelVideoPath($ID, $insertDir));
UpdateLevelVideoPath($ID, $insertDir);