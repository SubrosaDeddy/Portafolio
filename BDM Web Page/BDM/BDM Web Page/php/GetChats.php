<?php

require "Functions.php";
$userID = $_GET["userID"];

echo json_encode(GetChats($userID));