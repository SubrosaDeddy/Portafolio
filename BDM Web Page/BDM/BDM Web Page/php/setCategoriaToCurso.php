<?php

require "Functions.php";

$courseID = $_GET['courseID'];
$categoryID = $_GET['categoryID'];

echo json_encode(AddCategoryToCourse($courseID,$categoryID));
