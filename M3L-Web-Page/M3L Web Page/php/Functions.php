<?php
session_start();

function getLoggedUser()
{
    try
    {
        require "MySQL.php";

        if(!isset($_SESSION["email"]))
        return null;
        
        $query = "CALL SP_SelectUser('".$_SESSION["email"]."');";

        $consulta = mysqli_query($db, $query);

        $user = mysqli_fetch_assoc($consulta);

        return $user;
    }
    catch(Throwable $e)
    {
        return null;
    }
}

function obtenerSectores()
{
    try
    {
        require 'MySQL.php';

        $query = "";
        if(isset($_SESSION["ID"]))
        {
            $query = "CALL SP_SelectSectorsByRelevance(".$_SESSION["ID"].");";
        }
        else
        {
          $query = "CALL SP_SelectSectors();";
        }
        $consulta = mysqli_query($db, $query);
        
        $i = 0;
        $sectores = [];
        while($row = mysqli_fetch_assoc($consulta))
        {
            $sectores[$i]["pk_sector"] = $row["pk_sector"];
            $sectores[$i]["sectorTitle"] = $row["title"];
            $sectores[$i]["sectorDescription"] = $row["sectorDescription"];
            $sectores[$i]["svg"] = $row["svg"];
            $i++;
        }

        return $sectores;
        // echo json_encode($sectores);
    }
    catch(Throwable $th)
    {
        var_dump($th);
    }
}

function obtenerVacantes($sector)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectPositions(".$sector.");";
             
        $consulta = mysqli_query($db, $query);

        $i = 0;
        $positions = [];

        while($row = mysqli_fetch_assoc($consulta))
        {
            $positions[$i]["pk_position"] = $row["pk_position"];
            $positions[$i]["fk_sector"] = $row["fk_sector"];
            $positions[$i]["title"] = $row["title"];
            $positions[$i]["positionDescription"] = $row["positionDescription"];
            $positions[$i]["salary"] = $row["salary"];
            $positions[$i]["location"] = $row["location"];

            $i++;
        }

        return $positions;
    }
    catch(Throwable $th)
    {
        var_dump($th);
    }
}

function obtenerVacantesAdvanced($sector, $language="", $minPay = 0, $search = "")
{
    try
    {
        require "MySQL.php";
        
        $query = "CALL SP_SelectPositionsAdvanced(".$sector.", "."'".$search."','".$language."', ".$minPay.");";
             
        $consulta = mysqli_query($db, $query);

        $i = 0;
        $positions = [];

        while($row = mysqli_fetch_assoc($consulta))
        {
            $positions[$i]["pk_position"] = $row["pk_position"];
            $positions[$i]["fk_sector"] = $row["fk_sector"];
            $positions[$i]["title"] = $row["title"];
            $positions[$i]["positionDescription"] = $row["positionDescription"];
            $positions[$i]["salary"] = $row["salary"];
            $positions[$i]["location"] = $row["location"];

            $i++;
        }

        return $positions;
    }
    catch(Throwable $th)
    {
        var_dump($th);
    }
}

function obtenerDetalleVacante($idVacante)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectPositionDetail(".$idVacante.");";
        $consulta = mysqli_query($db, $query);
        $position = mysqli_fetch_assoc($consulta);
        return $position;
    }
    catch(Throwable $th)
    {
        var_dump($th);
    }
}

function obtenerRequisitos($idVacante)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectRequirementsByPosition(".$idVacante.");";
             
        $consulta = mysqli_query($db, $query);

        $i = 0;
        $requirements = [];

        while($row = mysqli_fetch_assoc($consulta))
        {
            $requirements[$i]["pk_requirement"] = $row["pk_requirement"];
            $requirements[$i]["fk_position"] = $row["fk_position"];
            $requirements[$i]["requirementDescription"] = $row["requirementDescription"];
            $requirements[$i]["yearsRequired"] = $row["yearsRequired"];

            $i++;
        }

        return $requirements;
    }
    catch(Throwable $th)
    {
        var_dump($th);
    }
}

function insertUser($user, $email, $password)
{
    require "MySQL.php";
    try
    {
        $query = "CALL SP_InsertUser('".$user."', '".$email."', '".$password."');";
        $resultado = mysqli_query($db, $query);
        while($row = mysqli_fetch_assoc($resultado))
        { 
            $ID["ID"] = $row["ID"];
        }
        $_SESSION["ID"]=$ID["ID"];
        $_SESSION["user"]=$user;
        $_SESSION["email"]=$email;
        return $ID;
    }
    catch(Throwable $e)
    {
        return false;
    }
}

function Login($username) //Es con el correo pero bueno xd
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectUser('".$username."');";
        $consulta = mysqli_query($db, $query);
        $user = [];
        while($row = mysqli_fetch_assoc($consulta))
        {
            $user["pk_user"] = $row["pk_user"];
            $user["username"] = $row["username"];
            $user["email"] = $row["email"];
            $user["pass"] = $row["pass"];
        }
        $_SESSION["ID"]=$user["pk_user"];
        $_SESSION["user"]=$user["username"];
        $_SESSION["email"]=$user["email"];
        return $user;
    }
    catch(Throwable $e)
    {
        exit;
    }
}

function VisitSector($sector, $value)
{
    try
    {
        require "MySQL.php";
        if($_SESSION["ID"] != "" && $_SESSION["ID"] != null)
        {
            $query = "CALL SP_UpsertUserSector(".$_SESSION["ID"].", ".$sector.", ".$value.");";
            mysqli_query($db, $query);
        }
    }
    catch(Throwable $e)
    {

    }
}