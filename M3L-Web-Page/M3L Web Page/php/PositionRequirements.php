<?php
require "Functions.php";

$vacante = $_GET['id'];
$position = obtenerRequisitos($vacante);

echo json_encode($position);