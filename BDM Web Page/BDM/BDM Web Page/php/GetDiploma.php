<?php

require "MySQL.php";

$userID = $_GET["userID"];
$courseID = $_GET["courseID"];

echo json_encode(GetDiploma($userID, $courseID));