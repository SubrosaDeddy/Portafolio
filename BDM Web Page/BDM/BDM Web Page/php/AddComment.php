<?php 
require "Functions.php";

$IDCurso = ( isset($_GET['idCurso']) ) ? $_GET['idCurso'] :  '';
$mensaje = ( isset($_GET['msg']) ) ? $_GET['msg'] :  '';

echo json_encode(AddComment($IDCurso, $mensaje));