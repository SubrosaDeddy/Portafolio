<?php

require "Functions.php";

//$username = $_GET["username"];
$user = GetUserLogged();

echo json_encode($user);