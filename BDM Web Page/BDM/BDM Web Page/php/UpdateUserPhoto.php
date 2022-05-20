<?php

require "Functions.php";

$id = ( isset($_GET["ID"]) ) ? $_GET["ID"] :  '';
$photo = ( isset($_FILES["photo"]["tmp_name"]) ) ? $_FILES["photo"]["tmp_name"] :  '';

echo json_encode(UpdateUserPhoto($id, $photo));