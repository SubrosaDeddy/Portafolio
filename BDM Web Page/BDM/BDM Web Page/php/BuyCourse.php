<?php

require "Functions.php";

$courseID = $_GET["id"];
$courseIndex = $_GET["index"];
$paymentMethod = $_GET["paymentMethod"];
$amountToPay = $_GET["amountToPay"];

echo json_encode(BuyCourse($courseID, $courseIndex, $paymentMethod, $amountToPay));