<?php

require "Functions.php";

$levelID = $_GET["levelID"];

echo json_encode(GetFilesByLevel($levelID));