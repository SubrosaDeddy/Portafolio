const imgPath = "img/";
const loggedUserScreen = document.getElementById("logged-user-screen");
const unloggedUserScreen = document.getElementById("not-logged-user-screen");
const UserSchoolTables = document.getElementById("VentasTable");
const UserAlumnTables = document.getElementById("CursosTabla");

const signup_username = document.getElementById("signup-username");
const signup_primer_nombre = document.getElementById("signup-name");
const signup_segundo_nombre = document.getElementById("signup-second-name");
const signup_apellido_paterno = document.getElementById("signup-last-name");
const signup_apellido_materno = document.getElementById("signup-second-last-name");
const signup_password = document.getElementById("signup-password");
const signup_genero = document.getElementById("signup-gender");
const signup_email = document.getElementById("signup-email");
const profile_photo = document.getElementById("signup-profile-photo");
const signup_tipo = document.getElementById("signup-user-type");
const boton_sign_up = document.getElementById("btn-sign-up");
const signupForm = document.getElementById("SignupForm");

const login_username = document.getElementById("loginUsername");
const login_password = document.getElementById("loginPassword");
const btn_login = document.getElementById("btn-login");
const search_course_bdm = document.getElementById("Catego1");
const search_course_html = document.getElementById("Catego2");
const search_course_js = document.getElementById("Catego3");

const updateForm = document.getElementById("formUpdateInfo");
const updateProfilePhoto = document.getElementById("update-profile-photo");

const tablaCursosProfesor = document.getElementById("teacherCourseTable");
const tablaAlumnosProfesor = document.getElementById("teacherStudentsTable");
const tablaCursosEstudiante = document.getElementById("StudentCoursesTable");

//boton_sign_up.addEventListener("click", signIn)
btn_login.addEventListener("click", logIn);

loggedUserScreen.hidden = true;
unloggedUserScreen.hidden = false;

$(document).ready(function() {

    $(signupForm).validate({
        rules: {
            username:
            {
                required: true,
                minlength: 8
            },
            name:
            {
                required: true
            },
            secondName:
            {
                required: false
            },
            lastName:
            {
                required: true
            },
            secondLastName:
            {
                required: false
            },
            password:
            {
                required: true,
                minlength: 8,
                // alphanumeric: true,
                // uppercase: true
            },
            email:
            {
                required: true,
                email: true
            },
            singupGender:
            {
                required: true
            },
            signupType:
            {
                required: true
            }
        },
        messages:{
            username: 
            {
                required: "Este campo es requisito.",
                minlength: "Mínimo 8 caracteres."
            },
            name: 
            {
                required: "Este campo es requisito."
            },
            lastName: 
            {
                required: "Este campo es requisito."
            },
            secondLastName: 
            {
                required: "Este campo es requisito.",
            },
            password: 
            {
                required: "Este campo es requisito.",
                minlength: "Mínimo 8 caracteres.",
                alphanumeric: "La contraseña debe contener un caracter especial",
                uppercase: "La contraseña debe contener al menos una mayúscula"
            },
            email: 
            {
                required: "Este campo es requisito.",
                email: "Formato incorrecto"
            },
            singupGender: 
            {
                required: "Este campo es requisito."
            },
            signupType: 
            {
                required: "Este campo es requisito."
            }
        }
    });

    $(updateForm).validate({
        rules:{
            username:
            {
                required: true,
                minlength: 8
            },
            passwordNew:
            {
                required: true,
                minlength: 8
            },
            firstName:
            {
                required: true
            },
            lastName:
            {
                required: true
            },
            secondLastName:
            {
                required: true
            },
            email:
            {
                required: true,
                email: true
            }
        },
        messages:
        {
            username:
            {
                required: "Este campo es requisito.",
                minlength: "Mínimo 8 caracteres."
            },
            passwordNew:
            {
                required: "Este campo es requisito.",
                minlength: "Mínimo 8 caracteres."
            },
            firstName:
            {
                required: "Este campo es requisito."
            },
            lastName:
            {
                required: "Este campo es requisito."
            },
            secondLastName:
            {
                required: "Este campo es requisito."
            },
            email:
            {
                required: "Este campo es requisito.",
                email: "Formato incorrecto"
            }
        }
    });

    loadCategories();

    keepLogged();
  });

$(function()
{
    $(signupForm).bind('submit', function(e)
    {
        e.preventDefault();
        if($(signupForm).valid())
        {
            $.ajax({
                type:'post',
                // url: 'http://localhost/BDM%20Web%20Page/php/SignUp.php',
                url: 'php/SignUp.php',
                data: $(signupForm).serialize(),
                success: function(msg, status, jqXHR)
                {
                    updateUserImg(msg, profile_photo);
                    alert("Te has registrado con exito, favor de loggearte");
                },
                error: function(xhr, status, error) 
                {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });
            return false;
        }
    });

    $(updateForm).bind('submit', function(e)
    {
        e.preventDefault();
        if($(updateForm).valid())
        {
            $.ajax({
                type:'post',
                // url: 'http://localhost/BDM%20Web%20Page/php/UpdateUser.php',
                url: 'php/UpdateUser.php',
                data: $(updateForm).serialize(),
                success: function(msg, status, jqXHR)
                {
                    updateUserImg(msg, updateProfilePhoto);
                    alert("Información actualizada");
                },
                error: function(xhr, status, error) 
                {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                } 
            });
            return false;
        }
    });
});

async function keepLogged()
{
    // const url = 'http://localhost/BDM%20Web%20Page/php/GetUserLogged.php';
    const url = 'php/GetUserLogged.php';
    const resultado = await fetch(url);
    var db = await resultado.json();

    if(db.id_user != "" && db.id_user != "undefined" && db.id_user != null)
    {
        // alert("Loggeado :D");
        // unloggedUserScreen.style.display = "none";
         loggedUserScreen.style.display = "block";
        unloggedUserScreen.remove();
        document.getElementById("inputUpdateUsername").value = db.userName;
        document.getElementById("inputUpdateFirstName").value = db.first_name;
        document.getElementById("inputUpdateMiddleName").value = db.middle_name;
        document.getElementById("inputUpdateLastName").value = db.last_name;
        document.getElementById("inputUpdateSecondLastName").value = db.second_last_name;
        document.getElementById("inputUpdateEmail").value = db.email;
        document.getElementById("user-screen-label").innerHTML = db.userName;
        var timestamp = new Date().getTime(); 
        document.getElementById("userPic").src = "img/userImg.png?t="+timestamp;

        if(db.usertype == 'Escuela'){
            UserAlumnTables.style.display="none";
            UserSchoolTables.style.display = "block";
            loadTablesSchool();
        }
        else if (db.usertype == 'Alumno'){
            UserSchoolTables.style.display ="none";
            UserAlumnTables.style.display = "block";
            loadCoursesByStudent();
            
            document.getElementById("btnCrearCurso").style.display = "none";
        }
    }
}

async function closeSession()
{
    // const url = "http://localhost/BDM%20Web%20Page/php/CloseSession.php";
    const url = "php/CloseSession.php";
    await fetch(url);
    location.reload();
}

async function logIn()
{
    // const url = 'http://localhost/BDM%20Web%20Page/php/Login.php?username='+login_username.value;
    const url = 'php/Login.php?username='+login_username.value;
    const resultado = await fetch(url);
    var db = await resultado.json();

    if(db.user_password != login_password.value)
    {
        // Alert
        alert("Usuario o contraseña incorrectas");
        console.log(db.user_password + " != " + login_password.value);
    }   
    else
    {
        // Logged
        alert("Loggeado :D");
        // unloggedUserScreen.style.display = "none";
         loggedUserScreen.style.display = "block";
        unloggedUserScreen.remove();
        document.getElementById("inputUpdateUsername").value = db.userName;
        document.getElementById("inputUpdateFirstName").value = db.first_name;
        document.getElementById("inputUpdateMiddleName").value = db.middle_name;
        document.getElementById("inputUpdateLastName").value = db.last_name;
        document.getElementById("inputUpdateSecondLastName").value = db.second_last_name;
        document.getElementById("inputUpdateEmail").value = db.email;
        document.getElementById("user-screen-label").innerHTML = db.userName;
        var timestamp = new Date().getTime(); 
        document.getElementById("userPic").src = "img/userImg.png?t="+timestamp;

        if(db.usertype == 'Escuela'){
            UserAlumnTables.style.display="none";
            UserSchoolTables.style.display = "block";
            loadTablesSchool();
        }
        else if (db.usertype == 'Alumno'){
            UserSchoolTables.style.display ="none";
            UserAlumnTables.style.display = "block";
            loadCoursesByStudent();
            document.getElementById("btnCrearCurso").style.display = "none";
        }
    }
}

async function signIn()
{
    if($(signupForm).valid())
    {
        // const url = 'http://localhost/BDM%20Web%20Page/php/SignUp.php?username='+signup_username.value+'&firstname='+signup_primer_nombre.value+'&middlename='+signup_segundo_nombre.value+'&lastname='+signup_apellido_paterno.value+'&secondlastname='+signup_apellido_materno.value+'&password='+signup_password.value+'&gender='+signup_genero.value+'&email='+signup_email.value+'&userType='+signup_tipo.value+'&photo='+imgPath;
        const url = 'php/SignUp.php?username='+signup_username.value+'&firstname='+signup_primer_nombre.value+'&middlename='+signup_segundo_nombre.value+'&lastname='+signup_apellido_paterno.value+'&secondlastname='+signup_apellido_materno.value+'&password='+signup_password.value+'&gender='+signup_genero.value+'&email='+signup_email.value+'&userType='+signup_tipo.value+'&photo='+imgPath;
        
        var data=new FormData();
        const fileExt = profile_photo.files[0].name.split('.').pop();
        const myNewFile = new File([profile_photo.files[0]], signup_username.value+"."+fileExt, {type: profile_photo.files[0].type});
        data.append("photo", myNewFile);
        
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.open("POST", url);
        xmlhttp.send(data);

        // console.log(db.Error);
        if(ID != false && profile_photo.files[0] != false)
        {
            unloggedUserScreen.hidden = true;
            loggedUserScreen.hidden = false;
        }
    }
}

async function updateUserImg(info, src)
{
    
    const json = JSON.parse(info);
    const ID = json.ID;
    
    // var formdata = new FormData();
    // const fileExt = profile_photo.files[0].name.split('.').pop();
    // const photo = new File([profile_photo.files[0]], ID+"."+fileExt, {type: profile_photo.files[0].type});
    
    var formdata = new FormData();
    const fileExt = src.files[0].name.split('.').pop();
    const photo = new File([src.files[0]], ID+"."+fileExt, {type: src.files[0].type});

    formdata.append("photo", photo);
    formdata.append("ID", ID);

    $.ajax({
        type:'post',
        // url: 'http://localhost/BDM%20Web%20Page/php/UpdateUserPhoto.php?ID='+ID,
        url: 'php/UpdateUserPhoto.php?ID='+ID,
        processData: false,
        contentType: false, 
        data: formdata,
        success: function(msg, status, jqXHR)
        {
            console.log(msg);
        },
        error: function(xhr, status, error) 
        {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function specialCharacter(data)
{
    var iChars = "!`@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";   
    for (var i = 0; i < data.length; i++)
    {      
        if (iChars.indexOf(data.charAt(i)) != -1)
        {
            return true; 
        } 
    }
    return false;
}

function validateUpperCase(data)
{
    for(var i = 0; i < data.length; i++)
    {
        if(data.charAt(i) == data.charAt(i).toUpperCase() && data.charAt(i).match(/[a-z]/i))
        {
            return true;
        }
    }
    return false;
}

function mostrarError(mensaje, element) {
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('error');
    alerta.style.color = '#b62222';

    element.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

// CHECAR ESTE
function SearchCourses(Categoria){
    // window.open('http://localhost/BDM%20Web%20Page/vacantes.html?category='+Categoria,'_self');
    window.open('vacantes.html?category='+Categoria,'_self');
}

function loadTablesSchool()
{
    $.ajax({
        type:'post',
        // url: 'http://localhost/BDM%20Web%20Page/php/GetTeacherHistory.php',
        url: 'php/GetTeacherHistory.php',
        success: function(msg, status, jqXHR)
        {
            var courses = JSON.parse(msg);
            courses.forEach(course => {
                var e_row = document.createElement("TR");
                
                // Ver
                var e_ver = document.createElement("TD");
                var e_btnVer = document.createElement("BUTTON");
                e_btnVer.innerHTML = "Ver";
                e_btnVer.setAttribute("onclick", "loadStudentsByCourse("+course.id_course+")");
                e_ver.append(e_btnVer);
                e_row.append(e_ver);

                // Curso
                var e_curso = document.createElement("TD");
                e_curso.innerHTML = course.title;
                e_row.append(e_curso);

                // Estudiantes
                e_estudiantes = document.createElement("TD");
                e_estudiantes.innerHTML = course.Estudiantes;
                e_row.append(e_estudiantes);

                // Ingresos
                var e_ingresos = document.createElement("TD");
                e_ingresos.innerHTML = course.Ingresos;
                e_row.append(e_ingresos);

                var e_bajaCurso = document.createElement("TD");
                var e_button = document.createElement("BUTTON");
                e_button.setAttribute("onclick", "deleteCourse("+course.id_course+")");
                e_button.setAttribute("id", "baja"+course.id_course);
                e_button.innerHTML = "Borrar";
                e_bajaCurso.append(e_button);
                e_row.append(e_bajaCurso);
                if(course.taken_down == 1)
                    e_button.disabled = true;

                tablaCursosProfesor.append(e_row);
            });
        },
        error: function(xhr, status, error) 
        {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function loadStudentsByCourse(course)
{
    tablaAlumnosProfesor.innerHTML = "";

    var header = document.createElement("TR");

    var headerAlumno = document.createElement("TH");
    headerAlumno.innerHTML = "Alumno";
    header.append(headerAlumno);

    var headerDate = document.createElement("TH");
    headerDate.innerHTML = "Fecha inscripcion";
    header.append(headerDate);

    var headerProgress = document.createElement("TH");
    headerProgress.innerHTML = "Niveles comprados";
    header.append(headerProgress);

    var headerPaidAmount = document.createElement("TH");
    headerPaidAmount.innerHTML = "Total pagado";
    header.append(headerPaidAmount);

    var headerMethod = document.createElement("TH");
    headerMethod.innerHTML = "Forma_de_pago";
    header.append(headerMethod);

    var headerChat = document.createElement("TH");
    headerChat.innerHTML = "Chat";
    header.append(headerChat);

    // var headerCertificate = document.createElement("TH");
    // headerCertificate.innerHTML = "Certificado otorgado";
    // header.append(headerCertificate);

    tablaAlumnosProfesor.append(header);
    $.ajax({
        type:'post',
        // url: 'http://localhost/BDM%20Web%20Page/php/GetStudentsByCourse.php?courseID='+course,
        url: 'php/GetStudentsByCourse.php?courseID='+course,
        success: function(msg, status, jqXHR)
        {
            var students = JSON.parse(msg);
            students.forEach(student => {
                var e_row = document.createElement("TR");
                
                var e_alumno = document.createElement("TD");
                e_alumno.innerHTML = student.userName;
                e_row.append(e_alumno);

                var e_fecha = document.createElement("TD");
                e_fecha.innerHTML = student.inscription_date;
                e_row.append(e_fecha);

                var e_progress = document.createElement("TD");
                e_progress.innerHTML = student.progress;
                e_row.append(e_progress);

                var e_amountPaid = document.createElement("TD");
                e_amountPaid.innerHTML = student.amountPaid;
                e_row.append(e_amountPaid);

                var e_method = document.createElement("TD");
                e_method.innerHTML = student.method_name;
                e_row.append(e_method);

                var e_chat = document.createElement("TD");
                var e_chatBtn = document.createElement("BUTTON");
                e_chatBtn.innerHTML = "-";
                e_chatBtn.setAttribute("onclick", "openChat("+student.id_user+")");
                e_chat.append(e_chatBtn);
                e_row.append(e_chat);
                
                // var e_certificate = document.createElement("TD");
                // var e_certificateCheck = document.createElement("INPUT");
                // e_certificateCheck.setAttribute("type", "checkbox");
                // e_certificate.append(e_certificateCheck);
                // e_row.append(e_certificate);

                tablaAlumnosProfesor.append(e_row);
            });
        },
        error: function(xhr, status, error) 
        {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function loadCoursesByStudent()
{
    tablaCursosEstudiante.innerHTML = "";

    var header = document.createElement("TR");

    var headerCurso = document.createElement("TH");
    headerCurso.innerHTML = "Curso";
    header.append(headerCurso);

    var headerProgress = document.createElement("TH");
    headerProgress.innerHTML = "Progreso";
    header.append(headerProgress);

    var headerInscriptionDate = document.createElement("TH");
    headerInscriptionDate.innerHTML = "Fecha inscripcion";
    header.append(headerInscriptionDate);

    var headerLastActivity = document.createElement("TH");
    headerLastActivity.innerHTML = "Última actividad";
    header.append(headerLastActivity);

    var headerCompletionDate = document.createElement("TH");
    headerCompletionDate.innerHTML = "Fecha finalización";
    header.append(headerCompletionDate);

    tablaCursosEstudiante.append(header);
    
    $.ajax({
        type:'post',
        // url: 'http://localhost/BDM%20Web%20Page/php/CoursesByStudent.php',
        url: 'php/CoursesByStudent.php',
        success: function(msg, status, jqXHR)
        {
            var courses = JSON.parse(msg);
            courses.forEach(course => {
               var row = document.createElement("TR");
                row.setAttribute("onclick", "window.open('detalle-vacante.html?id="+course.id_course+"','_self');");

                var e_title = document.createElement("TD");
                e_title.innerHTML = course.title;
                row.append(e_title);

                var e_progress = document.createElement("TD");
                e_progress.innerHTML = course.progress;
                row.append(e_progress);

                var e_inscriptionDate = document.createElement("TD");
                e_inscriptionDate.innerHTML = course.inscription_date;
                row.append(e_inscriptionDate);

                var e_lastActivity = document.createElement("TD");
                e_lastActivity.innerHTML = course.last_entry;
                row.append(e_lastActivity);

                var e_completionDate = document.createElement("TD");
                e_completionDate.innerHTML = course.conclusion_date;
                row.append(e_completionDate);

                tablaCursosEstudiante.append(row);
            });
        },
        error: function(xhr, status, error) 
        {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

async function loadCategories()
{
    $.ajax({
        type:'get',
        // url: 'http://localhost/BDM%20Web%20Page/php/GetCategorys.php',
        url: 'php/GetCategorys.php',
        success: function(msg, status, jqXHR)
        {
            const json = JSON.parse(msg);
            json.forEach(category => {
                const e_card = document.createElement("SECTION");
                e_card.classList.add("offer");
                e_card.classList.add("sombra-blanca");
                e_card.setAttribute("onclick", "SearchCourses('"+category.nombre+"')");
                
                const e_title = document.createElement("H3");
                e_title.innerHTML = category.nombre;

                const e_description = document.createElement("P");
                e_description.innerHTML = category.catDescription;

                e_card.appendChild(e_title);
                e_card.appendChild(e_description);

                document.getElementById("contenedor-categorias").appendChild(e_card);
            });
        },
        error: function(xhr, status, error) 
        {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

async function deleteCourse(id)
{
    // const url = "http://localhost/BDM%20Web%20Page/php/DeleteCourse.php?idCourse="+id;
    const url = "php/DeleteCourse.php?idCourse="+id;
    await fetch(url);
    const button = document.getElementById("baja"+id);
    button.disabled = true;
}

function openChat(destinty)
{
    // const url = "http://localhost/BDM%20Web%20Page/ChatView.html?Destiny="+destinty;
    const url = "ChatView.html?Destiny="+destinty;
    window.open(url);
}

