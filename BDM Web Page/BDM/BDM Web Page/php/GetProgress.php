<?php
require "Functions.php";

$IDCurso = ( isset($_GET['IdCourse']) ) ? $_GET['IdCourse'] :  '';
echo json_encode(GetProgress($IDCurso));