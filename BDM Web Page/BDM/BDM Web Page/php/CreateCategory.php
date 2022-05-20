<?php

require "Functions.php";

$categoryName = ( isset($_GET['categoryName']) ) ? $_GET['categoryName'] :  '';
$description = ( isset($_GET['description']) ) ? $_GET['description'] :  '';

//$creatorID = $_POST["creatorID"];
$Crear=CreateCategory($categoryName, $description);
echo json_encode($Crear);
//echo json_encode(CreateCategory($categoryName,$_SESSION['IDString']));