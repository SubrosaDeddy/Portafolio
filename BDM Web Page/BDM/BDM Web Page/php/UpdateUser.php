<?php
require "Functions.php";

$username=$_POST["username"];  
$firstname=$_POST["firstName"];  
$middlename=$_POST["middleName"];  
$lastname=$_POST["lastName"];  
$secondlastname=$_POST["secondLastName"];  
$password=$_POST["passwordNew"]; 
$email=$_POST["email"]; 

$result = "";
if(isset($username))
{
    $result = UpdateUser($username, $firstname, $middlename, $lastname, $secondlastname, $password, $email);
}
echo json_encode($result);