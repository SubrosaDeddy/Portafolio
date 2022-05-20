<?php 

require "Functions.php";

$IDCurso = ( isset($_GET['IdCourse']) ) ? $_GET['IdCourse'] :  '';
$IDLevel = ( isset($_GET['IdLevel']) ) ? $_GET['IdLevel'] :  '';
$levelIndex = ( isset($_GET['levelIndex']) ) ? $_GET['levelIndex'] :  '';
echo json_encode(FinishLevel($IDCurso,$IDLevel,$levelIndex));