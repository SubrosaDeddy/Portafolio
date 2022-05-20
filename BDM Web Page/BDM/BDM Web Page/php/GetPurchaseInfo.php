<?php

require "Functions.php";

$id = $_GET["id"];
$index = $_GET["index"];

echo json_encode(GetPurchaseInfo($id, $index));