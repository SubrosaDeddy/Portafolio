<?php
require "Functions.php";

$id = $_GET["ID"];

echo json_encode(UpdateCourseImage($id, $_FILES["photo"]["tmp_name"]));