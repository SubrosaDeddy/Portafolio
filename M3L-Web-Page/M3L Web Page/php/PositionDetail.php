<?php
require "Functions.php";

$vacante = $_GET['id'];
$position = obtenerDetalleVacante($vacante);

// var_dump($position);
echo json_encode($position);