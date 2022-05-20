<?php

require "Functions.php";

$idCourse = $_GET["idCourse"];

echo json_encode(DeleteCourse($idCourse));