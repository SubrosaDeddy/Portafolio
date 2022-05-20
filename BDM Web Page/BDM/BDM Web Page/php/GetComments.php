<?php

require "Functions.php";

$curso = $_GET["id_curso"];

echo json_encode(GetCommentsByCurso($curso));