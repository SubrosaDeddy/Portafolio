<?php

require "Functions.php";

$idCourse = $_GET["IdCourse"];

echo json_encode(GetCertificateData($idCourse));