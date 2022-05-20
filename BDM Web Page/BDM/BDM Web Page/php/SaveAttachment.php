<?php

require "Functions.php";

$levelID = $_GET["levelID"];

//Se tiene que enviar el archivo con el nombre "file", no es predefinido del arreglo $_FILES
$uploaddir = "../level_attachments/$levelID$".basename($_FILES["file"]["name"]);
$insertdir = "level_attachments/$levelID".basename($_FILES["file"]["name"]);

move_uploaded_file($_FILES["file"]["tmp_name"], $uploaddir);
echo json_encode(SaveAttachment($levelID, $insertdir));
