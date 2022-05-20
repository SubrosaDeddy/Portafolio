<?php

require "Functions.php";
$username =  ( isset($_GET['username']) ) ? $_GET['username'] :  '';
//$username = $_GET['username'];
$user = Login($username);
echo json_encode($user);