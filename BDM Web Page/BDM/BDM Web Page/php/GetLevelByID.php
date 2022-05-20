<?php 

require "Functions.php";

$IDCurso = ( isset($_GET['IdCourse']) ) ? $_GET['IdCourse'] :  '';
$IDLevel = ( isset($_GET['IdLevel']) ) ? $_GET['IdLevel'] :  '';
echo json_encode(GetLevelByID($IDCurso,$IDLevel));