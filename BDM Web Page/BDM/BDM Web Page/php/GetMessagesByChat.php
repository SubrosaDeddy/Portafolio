<?php

require "Functions.php";

$Chat = ( isset($_GET['id_chat']) ) ? $_GET['id_chat'] :  '';
echo json_encode(GetMessagesByChat($Chat));