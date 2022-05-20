<?php
// Import PHPMailer classes into the global namespace 
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception; 

require 'PHPMailer/Exception.php'; 
require 'PHPMailer/PHPMailer.php'; 
require 'PHPMailer/SMTP.php'; 

$to = "danlf9919@gmail.com";
$from = "quesadilla99@gmail.com";
$name = $_GET["name"];

$mail = new PHPMailer; 
$mail->isSMTP();                        // Set mailer to use SMTP 
$mail->Host = 'smtp.gmail.com';      // Specify main and backup SMTP servers 
// $mail->Host = gethostbyname('smtp.pepipost.com');
$mail->SMTPAuth = true;                 // Enable SMTP authentication 
$mail->Username = $from;                // SMTP username 
$mail->Password = 'Dany331569';         // SMTP password 
$mail->SMTPSecure = 'ssl';              // Enable TLS encryption, `ssl` also accepted 
$mail->Port = 465;                      // TCP port to connect to 
$mail->SMTPDebug = 1;

$mail->SMTPOptions = array(
    'ssl' => array(
    'verify_peer' => false,
    'verify_peer_name' => false,
    'allow_self_signed' => true
    )
);

// Sender info 
$mail->setFrom($from, 'M3L'); 
$mail->addReplyTo($from, 'M3L'); 
 
// Add a recipient 
$mail->addAddress($to); 
 
//$mail->addCC('cc@example.com'); 
//$mail->addBCC('bcc@example.com'); 
 
// Set email format to HTML 
$mail->isHTML(true); 
 
// Mail subject 
$mail->Subject = 'Signup Confirmation'; 
 
// Mail body content 
$bodyContent = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mail</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <style>
        :root
        {
            --claro: #BABABA;
            --claroscuro:#6E6E6E;
            --oscuro: #212121;
            --oscuro-light: #202020;
            --azul: #488B8F;
            --azul-oscuro: #293A3B;
        }

        html
        {
            font-size: 62.5%;
            box-sizing: border-box;
            min-height: 100%;
            /* scroll-snap-type: y mandatory; */
        }
        body 
        {
            min-height: 100%;
        }

        *, *:before, *:after
        {
            box-sizing: inherit;
        }

        body
        {
            font-size: 16px; 
            font-family: "Lexend Deca", sans-serif;
            background-image: linear-gradient(to top, var(--oscuro-light) 0%, var(--oscuro) 100%);
        }

        h1
        {
            font-size: 3.8rem;
            text-align: center;
            font-weight: 900;
            color: var(--claro);
        }
    </style>
    <h1>Hola, '.$name.', te damos la bienvenida a M3L</h1>
</body>
</html>';
// $bodyContent = '<h1>How to Send Email from Localhost using PHP by CodexWorld</h1>'; 
// $bodyContent .= '<p>This HTML email is sent from the localhost server using PHP by <b>CodexWorld</b></p>'; 
$mail->Body    = $bodyContent; 
 
// Send email 
if(!$mail->send()) { 
    echo 'Message could not be sent. Mailer Error: '.$mail->ErrorInfo; 
} else { 
    echo 'Message has been sent.'; 
} 
 
?>