<?php 
require "Functions.php";

$Curso =  $_GET['IdCourse'];
$Like = $_GET['Like'];

echo json_encode(LikeCourse($Curso,$Like));
