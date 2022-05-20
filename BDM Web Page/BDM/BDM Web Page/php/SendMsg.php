<?php

require "Functions.php";

$Mensaje =  ( isset($_GET['Mensaje']) ) ? $_GET['Mensaje'] :  '';
$ChatID =  ( isset($_GET['chatID']) ) ? $_GET['chatID'] :  '';

$Send = InsertMessage($Mensaje,$ChatID);
echo json_encode($Send);