<?php

require "Functions.php";

$email = $_GET["email"];

$user = Login($email);

echo json_encode($user);