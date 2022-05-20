<?php
//Ya no se usa este pedo pero aquí déjalo 
require "Functions.php";
$photo = $_FILES["photo"]["file"];   
$ID = $_GET['ID'];

$uploaddir = "../img/". basename($_FILES["photo"]["name"]);
$insertdir = "img/". basename($_FILES["photo"]["name"]);

// UpdateUserPhotoPath($ID, $insertdir);

move_uploaded_file($_FILES["photo"]["tmp_name"], $uploaddir);

