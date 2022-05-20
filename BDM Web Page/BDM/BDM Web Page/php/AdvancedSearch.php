<?php

require "Functions.php";

$text = $_GET["text"];
$category = $_GET["category"];

echo json_encode(AdvancedSearch($text, $category));