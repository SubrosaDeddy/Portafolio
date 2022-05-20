<?php
require "Functions.php";

$sector = $_GET['sector'];
if(isset($_GET['language']) && isset($_GET['minPay']) && isset($_GET['search']))
{
    $language = $_GET['language'];
    $minPay = $_GET['minPay'];
    $search = $_GET['search'];

    $positions = obtenerVacantesAdvanced($sector, $language, $minPay, $search);
    echo json_encode($positions);
    exit;
}
$positions = obtenerVacantes($sector);
echo json_encode($positions);
