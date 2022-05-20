<?php

require "Functions.php";

$fkChat = $_GET["fkChat"];
$fkUser = $_GET["fkUser"];
$message = $_GET["message"];

echo json_encode(InsertMessage($fkChat, $fkUser, $message));