<?php

require "Functions.php";

$value = $_GET["value"];
$sector = $_GET["sector"];
VisitSector($sector, $value);