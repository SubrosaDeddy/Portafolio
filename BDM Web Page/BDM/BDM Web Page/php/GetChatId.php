<?php 

require "Functions.php";

$Destiny =( isset($_GET['Destiny']) ) ? $_GET['Destiny'] :  '';

echo json_encode(getChatId($Destiny));