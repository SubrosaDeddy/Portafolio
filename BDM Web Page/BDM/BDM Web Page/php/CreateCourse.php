<?php

require "Functions.php";

$title =  $_GET['title'];
$image = $_FILES["image"];
$description = $_GET['description'];
$cost = $_GET['cost'];
$levelQuantity = $_GET['levelQuantity'];

echo json_encode(CreateCourse($title, $_FILES["image"]["tmp_name"], $description, $cost, $levelQuantity));