<?php 	 

 require "Functions.php";

$IDLevel = ( isset($_GET['IdLevel']) ) ? $_GET['IdLevel'] :  '';
echo json_encode(GetLevelFile($IDLevel));