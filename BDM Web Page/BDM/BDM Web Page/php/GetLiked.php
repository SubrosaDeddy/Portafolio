<?php

require "Functions.php";

$IdCourse = $_GET["IdCourse"];

echo json_encode(GetLiked($IdCourse));