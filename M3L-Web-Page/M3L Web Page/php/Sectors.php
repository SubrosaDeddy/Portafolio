<?php
require "Functions.php";

$sectores = obtenerSectores();

echo json_encode($sectores);