<?php 
require "Functions.php";

$category =  $_GET['category'];

echo json_encode(GetCoursesByCategory($category));
