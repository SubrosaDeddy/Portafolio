<?php 	

function getChatId($destiny){

	try{
		require "MySQL.php";

		$query1 = "CALL SP_SelectChats(".$_SESSION['IDString'].",'$destiny');";
        $Chat = mysqli_query($db,$query1);
        $getChatData = mysqli_fetch_assoc($Chat);
        $ChatID['id_chat']=$getChatData['id_chat'];
    	return $ChatID['id_chat'];
    }
    catch(Throwable $e)
    {
    	return $e;
    }
}

function InsertMessage($message,$ChatID)
{
    try
    {
        //CORREGIR POR LA WEA DE LOS 2 CHATS
        require "MySQL.php";
    
        /*$query1 = "CALL SP_SelectChats(".$_SESSION['IDString'].",'$destiny');";
        $Chat = mysqli_query($db,$query1);
        $getChatData = mysqli_fetch_assoc($Chat);
        $ChatID=$getChatData['id_chat'];*/

        $query = "CALL SP_InsertMessage($ChatID, ".$_SESSION['IDString'].", '$message');";
        $consulta = mysqli_query($db, $query);
        //return $consulta;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetLevelByID($IDCurso,$IDLevel){
	
	require "MySQL.php";

	try 
	{	
		$query = "CALL SP_SelectLevelByID('$IDCurso','$IDLevel')";
		$resultado = mysqli_query($db,$query);
		$consulta = mysqli_fetch_assoc($resultado);
		return $consulta;
		
	} catch (Throwable $e) {
		return $e;
	}

}

function FinishLevel($IDCurso,$IDLevel,$levelIndex)
{
	try 
	{
        require "MySQL.php";
		$query = "CALL SP_FinishLevel($IDCurso,".$_SESSION['IDString'].", $levelIndex)";
		$resultado = mysqli_query($db,$query);
		$ret = mysqli_fetch_assoc($resultado);
        return $ret;
	} 
    catch (Throwable $e) 
    {
		return $e;
	}
}

function GetLevelFile($IdLevel){

	require "MySQL.php";

	try 
	{
		$query = "CALL SP_SelectFilesByLevel('$IdLevel')";
		$resultado = mysqli_query($db,$query);
		$consulta = mysqli_fetch_assoc($resultado);
		file_put_contents("../PDFS/".'$IdLevel'.".pdf", base64_decode($consulta['archivo']));
		return $consulta;
	} 
	catch (Throwable $e)
	{
		return $e;
	}
}

function GetProgress($IDCurso){

	require "MySQL.php";

	try 
	{
		$query = "CALL SP_GetProgress('$IDCurso',".$_SESSION['IDString'].")";
		$resultado = mysqli_query($db,$query);
		$consulta = mysqli_fetch_assoc($resultado);
		return $consulta;
	} 
	catch (Throwable $e)
	{
		return $e;
	}
}

function AddComment($IDCurso, $mensaje){

		

	try 
	{
		require "MySQL.php";
		$query = "CALL SP_InsertComment('$mensaje','$IDCurso',".$_SESSION['IDString'].")";
		$resultado = mysqli_query($db,$query);
		$consulta = mysqli_fetch_assoc($resultado);
		
	} 
	catch (Throwable $e)
	{
		return $e;
	}

}

function GetCertificateData($idCourse){
	try 
	{
		require "MySQL.php";
		$query = "CALL SP_GetCertificadoData($idCourse,".$_SESSION['IDString'].")";
		$resultado = mysqli_query($db,$query);
		$consulta = mysqli_fetch_assoc($resultado);
		return $consulta;	
	} 
	catch (Throwable $e)
	{
		return $e;
	}
}

function LikeCourse($Curso,$Like){
	try 
	{
		require "MySQL.php";
		$query = "CALL SP_LikeCourse($Curso,".$_SESSION['IDString'].",$Like)";
		$resultado = mysqli_query($db,$query);
	
	} 
	catch (Throwable $e)
	{
		return $e;
	}
}