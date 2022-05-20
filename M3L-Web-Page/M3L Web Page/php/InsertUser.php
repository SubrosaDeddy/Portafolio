<?php
require "Functions.php";

$user = $_POST["username"];
$mail = $_POST["email"];
$password = $_POST["password"];
// $ID = insertUser($user, $mail, $password);
// echo json_encode($ID);
echo json_encode(insertUser($user, $mail, $password));