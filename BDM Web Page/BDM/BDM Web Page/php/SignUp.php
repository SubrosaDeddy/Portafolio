<?php
/*
require "Functions.php";

$username = ( isset($_GET['username']) ) ? $_GET['username'] :  '';
$firstname = ( isset($_GET['name']) ) ? $_GET['name']:'';
$middlename = ( isset($_GET['secondName']) ) ? $_GET['secondName']:'';
$lastname = ( isset($_GET['lastName']) ) ? $_GET['lastName']:'';
$secondlastname = ( isset($_GET['secondLastName']) ) ? $_GET['secondlastname']:'';
$password = ( isset($_GET['password']) ) ? $_GET['password']:'';
$email = ( isset($_GET['email']) ) ? $_GET['email']:'';
$gender = ( isset($_GET['singupGender']) ) ? $_GET['singupGender']:'';
$type = ( isset($_GET['signupType']) ) ? $_GET['signupType']:'';

echo json_encode(SignUp($username, $firstname, $middlename, $lastname, $secondlastname, $password, $gender, $email, $type));
*/

require "Functions.php";

$username = $_POST['username'];
$firstname = $_POST['name'];
$middlename = $_POST['secondName'];
$lastname = $_POST['lastName'];
$secondlastname = $_POST['secondLastName'];
$password = $_POST['password'];
$email = $_POST['email'];
$gender = $_POST['singupGender'];
$type = $_POST['signupType'];

$result="";
if(isset($username) && isset($firstname) && isset($lastname) && isset($secondlastname) && isset($password) && isset($email) && isset($gender) && isset($type))
{
    $result = SignUp($username, $firstname, $middlename, $lastname, $secondlastname, $password, $gender, $email, $type);
}
echo json_encode($result);

