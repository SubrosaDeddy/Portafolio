<?php
require "Functions.php";

$userCourseID = $_POST["userCourseID"];
$paymentMethod = $_POST["paymentMethod"];
$conclusionDate = $_POST["conclusionDate"];
$lastEntry = $_POST["lastEntry"];
$progress = $_POST["progress"];
$rating = $_POST["rating"];
$lastLevelPaid = $_POST["lastLevelPaid"];

echo json_encode(UpdateUserCourse($userCourseID, $paymentMethod, $conclusionDate, $lastEntry, $progress, $rating, $lastLevelPaid));