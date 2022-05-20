<?php

require "Functions.php";

$courseID = $_GET["courseID"];

echo json_encode(GetStudentsByCourse($courseID));