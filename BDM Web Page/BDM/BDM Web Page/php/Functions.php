<?php
// $usernameString = "name";
// $IDString = "ID";
// $emailString = "email";
session_start();

function SignUp($username, $firstname, $middlename, $lastname, $secondlastname, $password, $gender, $email, $type)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_InsertUser('$username', '$firstname', '$middlename', '$lastname', '$secondlastname', '$password', '$gender', '$email', '$type');";
        $consulta = mysqli_query($db, $query);
        $row = mysqli_fetch_assoc($consulta);
        $IDs["ID"] = $row["ID"];

        $_SESSION["usernameString"] = $username;
        $_SESSION["IDString"] = $IDs["ID"];
        $_SESSION["emailString"] = $username;
        return $IDs;
    }
    catch(Throwable $e)
    {
        return $error["error"] = $e;
    }
}

function UpdateUser($username, $firstname, $middlename, $lastname, $secondlastname, $password, $email)
{
    try
    {
        require "MySQL.php";
	    $id = $_SESSION["IDString"];
        $query = "CALL SP_UpdateUser($id, '$firstname', '$middlename', '$lastname', '$secondlastname', '$username', '$password', '$email');";
        $consulta = mysqli_query($db, $query);
        $row = mysqli_fetch_assoc($consulta);
        $ID["ID"] = $row["ID"];
        return $ID;
    }
    catch(Throwable $e)
    {
        return null;
    }
}

function CreateCategory($categoryName, $description)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_InsertCategory('$categoryName', '".$_SESSION["usernameString"]."', '$description');";
        $consulta = mysqli_query($db, $query);
        $row = mysqli_fetch_assoc($consulta);
        return $consulta;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function UpdateUserPhoto($userID, $photo)
{
    try
    {
        require "MySQL.php";
        // mysqli_escape_string($db, file_get_contents($photo))
        // $query = "SP_UpdateUserImage($userID, '". file_get_contents($photo) ."' );";
        // $file = base64_encode(mysqli_real_escape_string($db, $photo));

        $query = "CALL SP_UpdateUserImage($userID, '". base64_encode(file_get_contents($photo)) ."');";
        $consulta = mysqli_query($db, $query);
        $row = mysqli_fetch_assoc($consulta);
        return $row;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetUserByUsername($username)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectUser('$username');";
        $consulta = mysqli_query($db, $query);

        $row = mysqli_fetch_assoc($consulta);
        $ret["id_user"] = $row["id_user"]; 
        $ret["fk_user_name"] = $row["fk_user_name"]; 
        $ret["userName"] = $row["userName"]; 
        $ret["user_password"] = $row["user_password"]; 
        $ret["gender"] = $row["gender"]; 
        $ret["email"] = $row["email"]; 
        $ret["photo"] = $row["photo"]; 
        $ret["id_name"] = $row["id_name"]; 
        $ret["first_name"] = $row["first_name"]; 
        $ret["middle_name"] = $row["middle_name"]; 
        $ret["last_name"] = $row["last_name"]; 
        $ret["second_last_name"] = $row["second_last_name"];

        return $ret;
    }
    catch(Throwable $e)
    {
        echo($e);
    }
}

function GetUserLogged()
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectUser('".$_SESSION["usernameString"]."');";
        $consulta = mysqli_query($db, $query);

        $row = mysqli_fetch_assoc($consulta);
        // $ret["id_user"] = $row["id_user"]; 
        // $ret["fk_user_name"] = $row["fk_user_name"]; 
        // $ret["userName"] = $row["userName"]; 
        // $ret["user_password"] = $row["user_password"]; 
        // $ret["gender"] = $row["gender"]; 
        // $ret["email"] = $row["email"]; 
        // $ret["photo"] =  base64_decode($row["photo"]); 
        // $ret["id_name"] = $row["id_name"]; 
        // $ret["first_name"] = $row["first_name"]; 
        // $ret["middle_name"] = $row["middle_name"]; 
        // $ret["last_name"] = $row["last_name"]; 
        // $ret["second_last_name"] = $row["second_last_name"];
        file_put_contents("../img/userImg.png", base64_decode($row['photo']));        
        $ret = $row;

        return $ret;
    }
    catch(Throwable $e)
    {
        echo($e);
    }
}

function Login($username)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectUser('$username');";
        $consulta = mysqli_query($db, $query);


        $row = mysqli_fetch_assoc($consulta);
        
        $ret["id_user"] = $row["id_user"]; 
        $ret["fk_user_name"] = $row["fk_user_name"]; 
        $ret["userName"] = $row["userName"]; 
        $ret["user_password"] = $row["user_password"]; 
        $ret["gender"] = $row["gender"]; 
        $ret["email"] = $row["email"]; 
        $ret["photo"] = $row["photo"]; 
        $ret["id_name"] = $row["id_name"];
        $ret["usertype"] = $row["usertype"];
        $ret["first_name"] = $row["first_name"]; 
        $ret["middle_name"] = $row["middle_name"]; 
        $ret["last_name"] = $row["last_name"]; 
        $ret["second_last_name"] = $row["second_last_name"];
        file_put_contents("../img/userImg.png", base64_decode($row['photo']));

        $_SESSION["usernameString"] = $ret["userName"];
        $_SESSION["IDString"] = $ret["id_user"];
        $_SESSION["emailString"] = $ret["email"];

        return $ret;
         
    }
    catch(Throwable $e)
    {
        echo($e);
    }
}

function GetCoursesByCategory($category){
    try
    {
        require "MySQL.php";

        $query = "CALL SP_GetCourseByCatego('$category');";

        $resultado = mysqli_query($db, $query);

        $courses = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($resultado))
        {
            // $courses[$i]["id_course"] = $row["id_course"];
            // $courses[$i]["id_instructor"] = $row["id_user"];
            // $courses[$i]["title"] = $row["title"];
            // $courses[$i]["first_name"] = $row["first_name"];
            // $courses[$i]["last_name"] = $row["last_name"];
            // $courses[$i]["level_quantity"] = $row["level_quantity"];
            $courses[$i] = $row;
            $i++;
        }

        return $courses;
    }
    catch(Throwable $e)
    {
        $error["error"] = $e->getMessage();
        return $error;
    }
}

function GetCommentsByCurso($id_curso)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectCommentsByCourse($id_curso);";

        $resultado = mysqli_query($db, $query);

        $comments = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($resultado))
        {
            $comments[$i]["id_comment"] = $row["id_comment"];
            $comments[$i]["userName"] = $row["userName"];
            $comments[$i]["fk_user"] = $row["fk_user"];
            $comments[$i]["fk_course"] = $row["fk_course"];
            $comments[$i]["title"] = $row["title"];
            $comments[$i]["comment_description"] = $row["comment_description"];
            $comments[$i]["post_date"] = $row["post_date"];
            $i++;
        }
        return $comments;
    }
    catch(Throwable $e)
    {
        echo($e);
    }
}

function CreateCourse($title, $image, $description, $cost, $levelQuantity)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_InsertCourse(". $_SESSION["IDString"] .", '$title', '". base64_encode(file_get_contents($image)) ."', '$description', $cost, $levelQuantity);";
        $consulta = mysqli_query($db, $query);
        $row = mysqli_fetch_assoc($consulta);
        $IDs["ID"] = $row["ID"];
        return $IDs;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function UpdateCourseImage($idCourse, $image)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_UpdateCoursePhoto($idCourse, '".base64_encode(file_get_contents($image))."');";
        $consulta = mysqli_query($db, $query);
        $row = mysqli_fetch_assoc($consulta);
        $ID["ID"] = $row["ID"]; 
    }
    catch(Throwable $e)
    {
        echo $e;
    }
}

function CreateLevel($fk_course,$level_index,$level_cost,$video, $description){
    try
    {
        require "MySQL.php";
        $query = "CALL SP_InsertLevel($fk_course,'$video',$level_index, $level_cost,'$description');";
        $consulta = mysqli_query($db, $query);
        $result = mysqli_fetch_assoc($consulta);
        

        return $result["ID"];
    }
    catch(Throwable $e)
    {
        $error["error"] = $e;
        return $e;
    }
}

function InsertFile($levelID, $file_tmploc)
{
    try
    {
        require "MySQL.php";
        $file = base64_encode(file_get_contents($file_tmploc));
        $query = "CALL SP_InsertFile($levelID, '$file');";
        $consulta = mysqli_query($db, $query);
        $result = mysqli_fetch_assoc($consulta);
        return $result["ID"];
    }
    catch(Throwable $e)
    {
        $error["error"] = $e;
        return $e;
    }
}
 
function UpdateLevelVideoPath($levelID, $videoPath)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_UpdateLevelVideoPath($levelID, '$videoPath');";
        $consulta = mysqli_query($db, $query);
        // $row = mysqli_fetch_assoc($consulta);
        // $ID["ID"] = $row["ID"];
        // return $ID;
    }
    catch(Throwable $e)
    {
        echo $e;
    }
}

function getCategoryList(){
    try{
        require "MySQL.php";

        $query = "CALL SP_ViewCategos();";
        $resultado= mysqli_query($db,$query);

        $categos = [];
        $i=0;
        while($row = mysqli_fetch_assoc($resultado))
        {
            // $categos[$i]["id_category"] = $row["id"];
            // $categos[$i]["category_name"]=$row["nombre"];
            $categos[$i] = $row;
            $i++;
        }
        return $categos;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function AddCategoryToCourse($courseID, $categoryID)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_InsertCourseCategory($courseID, $categoryID);";
        $consulta = mysqli_query($db, $query);
        return $consulta;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function DeleteCourse($idCourse)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_DeleteCourse($idCourse);";
        $consulta = mysqli_query($db, $query);
        return $consulta;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function UpdateCourse($courseID, $title, $image, $description)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_UpdateCourse($courseID, $title, '". base64_encode(file_get_contents($image)) ."', '$description');";
        $consulta = mysqli_query($db, $query);
        return $consulta;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function BuyCourse($courseID, $index, $paymentMethod, $amountToPay)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_BuyCourse(".$_SESSION["IDString"].", $courseID, $paymentMethod, $index, $amountToPay);";
        $consulta = mysqli_query($db, $query);
        // return $ret;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetPurchaseInfo($id, $index)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_PurchaseInfo($id, ".$_SESSION["IDString"].", $index)";
        $consulta = mysqli_query($db, $query);
        $row = mysqli_fetch_assoc($consulta);

        return $row;
    }
    catch(Throwable $e)
    {
        $error["error"] = $e;
        return $error;
    }
}

function GetUserBoughtCourses($idUser)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_SelectUserCourse($idUser);";
        $consulta = mysqli_query($db, $query);

        $courses = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $courses[$i] = $row;
            $i++;
        }
        return $courses;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function SaveAttachment($levelID, $attachemntPath)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_InsertFile($levelID, '$attachemntPath')";
        $consulta = mysqli_query($db, $query);
        return $consulta;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetFilesByLevel($levelID)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_SelectFilesByLevel($levelID);";
        $consulta = mysqli_query($db, $query);

        $files = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $files[$i] = $row;
            $i++;
        }
        return $files;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetDiploma($userID, $courseID)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectDiploma($userID, $courseID);";
        $consulta = mysqli_query($db, $query);

        $diploma = mysqli_fetch_assoc($consulta);

        return $diploma;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function InsertChat($studentID, $teacherID)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_InsertChat($studentID, $teacherID);";
        $consulta = mysqli_query($db, $query);
        return $consulta;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetChats($userID)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_SelectChats($userID);";
        $consulta = mysqli_query($db, $query);

        $chats = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $chats[$i] = $row;
            $i++;
        }
        return $chats;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

//FUNCIONES DE MENSAJES
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

function UpdateUserCourse($userCourseID, $paymentMethod, $conclusionDate, $lastEntry, $progress, $rating, $lastLevelPaid)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_UpdateUserCourse($userCourseID, $paymentMethod, $conclusionDate, $lastEntry, $progress, $rating, $lastLevelPaid);";

        $consulta = mysqli_query($db, $query);
        return $consulta;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetTeacherHistory()
{
    try
    {
        require "MySQL.php";
        
        $query = "CALL SP_HistoryByTeacher(".$_SESSION['IDString'].");";
        $consulta = mysqli_query($db, $query);
        
        $ret = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $ret[$i] = $row; 
            $i++;
        }
        return $ret;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetStudentsByCourse($courseID)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_StudentsByCourse($courseID);";

        $consulta = mysqli_query($db, $query);

        $ret = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $ret[$i] = $row;
            $i++;
        }
        return $ret;
    }
    catch(Throwable $e)
    {
        $error["error"] = $e;
        return $error;
    }
}

function CoursesByStudent()
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_CourseByUser(".$_SESSION["IDString"].");";
        $consulta = mysqli_query($db, $query);
        
        $ret = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $ret[$i] = $row;
            $i++;
        }
        return $ret;
    }
    catch(Throwable $e)
    {
        $error["error"] = $e;
        return $error;
    }
}

function GetTeacherCourses($id)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_SelectTeacherCourses($id);";
        $consulta = mysqli_query($db, $query);
        $result = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $result[$i] = $row;
            $i++;
        }
        return $result;
    }
    catch(Throwable $e)
    {
        $error["error"] = $e;
        return $error;
    }
}

function GetMessagesByChat($ChatID)
{
    try
    {
        require "MySQL.php";

        $query = "CALL SP_GetMessages('$ChatID');";
        $consulta = mysqli_query($db, $query);

        $messages = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            if($row['idUsuario']==$_SESSION['IDString']){
                $messages[$i]['propietario'] = 'owner';
            }
            else{
                $messages[$i]['propietario'] = 'nowner';
            }
            $messages[$i]['texto'] = $row['msg'];
            $messages[$i]['fecha'] = $row['fecha'];
            $i++;
        }
        return $messages;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetLevelsByCourse($IDCurso){
    try
    {
        require "MySQL.php";

        $query = "CALL SP_SelectLevelsByCourse($IDCurso);";
        $consulta = mysqli_query($db, $query);

        $levels = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $levels[$i] = $row;
            $i++;
        }
        return $levels;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetCourseByID($IDCurso){
    try
    {
        require "MySQL.php";

        $query = "CALL SP_GetCourseByID($IDCurso);";
        $consulta = mysqli_query($db,$query);
        $row=mysqli_fetch_assoc($consulta);
        return $row;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

function GetLastLevelPaid($IDCurso){
    try
    {
        require "MySQL.php";

        $query="CALL SP_GetLastLevelPaid('$IDCurso',". $_SESSION["IDString"] .")";
        $consulta = mysqli_query($db,$query);
        $resultado=mysqli_fetch_assoc($consulta);
        return $resultado;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}

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

function GetLevelByID($IDCurso,$IDLevel)
{
	try 
	{	
        require "MySQL.php";
		$query = "CALL SP_SelectLevelByID($IDCurso, $IDLevel)";
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
		$query = "CALL SP_SelectFilesByLevel($IdLevel)";
		$resultado = mysqli_query($db,$query);
		$consulta = mysqli_fetch_assoc($resultado);
		file_put_contents("../PDFS/$IdLevel.pdf", base64_decode($consulta['archivo']));
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

function AddComment($IDCurso, $mensaje)
{
	try 
	{
		require "MySQL.php";
		$query = "CALL SP_InsertComment('$mensaje',$IDCurso,".$_SESSION['IDString'].")";
		$resultado = mysqli_query($db,$query);
		$consulta = mysqli_fetch_assoc($resultado);
		
	} 
	catch (Throwable $e)
	{
		return $e;
	}

}

function AdvancedSearch($text, $category)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_AdvancedSearch('$text', '$category');";
        $consulta = mysqli_query($db, $query);

        $ret = [];
        $i = 0;
        while($row = mysqli_fetch_assoc($consulta))
        {
            $ret[$i] = $row;
            $i++;
        }
        // $ret["query"] = $query;
        return $ret;
    }
    catch(Throwable $e)
    {
        $error["error"] = $e;
        return $error;
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
        $ret["query"] = $query;
        return $ret;
	} 
	catch (Throwable $e)
	{
		return $e;
	}
}

function GetLiked($IdCourse)
{
    try
    {
        require "MySQL.php";
        $query = "CALL SP_GetLiked($IdCourse, ".$_SESSION["IDString"].");";
        $consulta = mysqli_query($db, $query);
        $ret = mysqli_fetch_assoc($consulta);
        return $ret;
    }
    catch(Throwable $e)
    {
        return $e;
    }
}