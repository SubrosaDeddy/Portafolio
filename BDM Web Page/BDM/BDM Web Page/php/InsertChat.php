<?php

require "Functions.php";

$studentID = $_GET["studentID"];
$teacherID = $_GET["teacherID"];

echo json_encode(InsertChat($studentID, $teacherID));