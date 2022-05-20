<?php

require "Functions.php";

$username = $_GET["username"];
$user = GetUserByUsername($username);

echo json_encode($user);