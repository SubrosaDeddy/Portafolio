const imgPath = "img/";

const formularioSignUp = document.querySelector(".form-sign-in");
const formularioLogin = document.querySelector(".form-login");
const formularioUpdate = document.querySelector(".formUpdateInfo");

const loginUsername = document.querySelector('#loginUsername');
const loginPassword = document.querySelector('#loginPassword');

const signupName = document.querySelector('#signup-name');
const signupMiddleName = document.querySelector('#signup-second-name');
const signupLastName = document.querySelector('#signup-last-name');
const signupSecondLastName = document.querySelector('#signup-second-last-name');
const signupPassword = document.querySelector('#signup-password');
const signupEmail = document.querySelector('#signup-email');
const signupGender = document.querySelector('#signup-gender');
const signupType = document.querySelector('#signup-user-type');
const profile_photo = document.getElementById("signup-profile-photo");

const updateUsername = document.querySelector('#updateUsername');
const updatePassword = document.querySelector('#updatePassword');
const updateEmail = document.querySelector('#updateEmail');
const updateFullname = document.querySelector('#updateFullname');

const commentContainer = document.getElementById("msg");
const AddComment = document.getElementById("Comentar");
const GoToChat = document.getElementById("ChatSchool");
const Certificar = document.getElementById("obtenerCertificado");

const StarLike = document.getElementById("DarLike");


// if(loginUsername)
//     loginUsername.addEventListener('input', readLoginText);
// if(loginPassword)
//     loginPassword.addEventListener('input', readLoginText);

// if(signupName)
//     signupName.addEventListener('input', readSigninText);
// if(signupMiddleName)
//     signupMiddleName.addEventListener('input', readSigninText);
// if(signupLastName)
//     signupLastName.addEventListener('input', readSigninText);
// if(signupSecondLastName)
//     signupSecondLastName.addEventListener('input', readSigninText);
// if(signupPassword)
//     signupPassword.addEventListener('input', readSigninText);
// if(signupEmail)
//     signupEmail.addEventListener('input', readSigninText);

// if(updateUsername)
//     updateUsername.addEventListener('input', readUpdateText);
// if(updatePassword)
//     updatePassword.addEventListener('input', readUpdateText);
// if(updateEmail)
//     updateEmail.addEventListener('input', readUpdateText);
// if(updateFullname)
//     updateFullname.addEventListener('input', readUpdateText);

const datosLogin = {
    loginUsername: '',
    loginPassword: ''
}

const datosSignUp = {
    signupName: '',
    signupMiddleName: '',
    signupLastName: '',
    signupSecondLastName: '',
    signupPassword: '',
    signupEmail: '',
    singupGender: '',
    signupType: '',
}

const datosUpdate = {
    updateUsername: '',
    updatePassword: '',
    updateEmail: '',
    updateFullname: ''
}


if(formularioSignUp)
    formularioSignUp.addEventListener("submit", function(evento){
    evento.preventDefault();

    if(signupName.value === '' || signupMiddleName.value === '' || signupLastName.value === '' || signupSecondLastName.value === '' || signupPassword.value === '' || signupEmail.value === '' || signupGender.value === '' || signupType.value === '')
    {
        mostrarError('*Todos los campos son obligatorios', formularioSignUp)
    }
    else if(signupPassword.value.length < 8)
    {
        mostrarError('*La contraseña debe ser de al menos 8 caracteres', formularioSignUp)
    }
    else if(!specialCharacter(signupPassword.value))
    {
        mostrarError('*La contraseña debe contener al menos un caracter especial', formularioSignUp);
    }
    else if(!validateUpperCase(signupPassword.value))
    {
        mostrarError('*La contraseña debe contener al menos una mayúscula', formularioSignUp);
    }
    else
    {
        signIn();
    }

});

if(formularioLogin)
    formularioLogin.addEventListener("submit", function(evento){
    evento.preventDefault();

    const {loginUsername, loginPassword} = datosLogin;

    if(loginUsername === '' || loginPassword === '')
    {
        mostrarError('*Todos los campos son obligatorios', formularioLogin);
    }
});

if(formularioUpdate)
    formularioUpdate.addEventListener("submit", function(evento){
    evento.preventDefault();

    const{ updateUsername, updatePassword, updateEmail, updateFullname } = datosUpdate;

    if(updateUsername === '' || updatePassword === '')
    {
        mostrarError('*Todos los campos son obligatorios', formularioUpdate);
    }
    else if(updatePassword.length < 8)
    {
        mostrarError('*La contraseña debe ser de al menos 8 caracteres', formularioUpdate)
    }
    else if(!specialCharacter(updatePassword))
    {
        mostrarError('*La contraseña debe contener al menos un caracter especial', formularioUpdate);
    }
    else if(!validateUpperCase(updatePassword))
    {
        mostrarError('*La contraseña debe contener al menos una mayúscula', formularioUpdate);
    }
})

async function signIn()
{
    // const url = 'http://localhost/BDM%20Web%20Page/php/SignUp.php?firstname='+primer_nombre.value+'&middlename='+segundo_nombre.value+'&lastname='+apellido_paterno.value+'&secondlastname='+apellido_materno.value+'&password='+password.value+'&gender='+genero.value+'&email='+email.value+'&photo='+imgPath
    const url = 'php/SignUp.php?firstname='+primer_nombre.value+'&middlename='+segundo_nombre.value+'&lastname='+apellido_paterno.value+'&secondlastname='+apellido_materno.value+'&password='+password.value+'&gender='+genero.value+'&email='+email.value+'&photo='+imgPath
    const resultado = await fetch(url);

    var data=new FormData();
    data.append("photo", profile_photo.files[0]);
    data.append("photoname", profile_photo.files[0].name);

    var xmlhttp = new XMLHttpRequest()
    // xmlhttp.open("POST", "http://localhost/BDM%20Web%20Page/php/UploadPhoto.php");
    xmlhttp.open("POST", "php/UploadPhoto.php");
    xmlhttp.send(data);

    if(resultado)
    {
        // Pop up registro
    }
    else
    {
        // Pop up fallado 
    }

}

function readLoginText(e)
{
    datosLogin[e.target.id] = e.target.value;
}

function readSigninText(e)
{
    datosSignUp[e.target.id] = e.target.value;
}

function readUpdateText(e)
{
    datosUpdate[e.target.id] = e.target.value;
}

function mostrarError(mensaje, element) {
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('error');
    alerta.style.color = '#b62222';

    element.appendChild(alerta);

    // setTimeout(() => {
    //     alerta.remove();
    // }, 3000);
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

// function mostrarMensaje(mensaje) {
//     const alerta = document.createElement('p');
//     alerta.textContent = mensaje;
//     alerta.classList.add('correcto');
//     formulario.appendChild(alerta);

//     setTimeout(() => {
//         alerta.remove();
//     }, 3000);
// }

///////////////////////////////////////////////////////////////
//////////////////////////RELLENAR/////////////////////////////
///////////////////////////////////////////////////////////////

var docurl = new URL(document.URL);

var idCurso = docurl.searchParams.get("id");

var Liked = 0;

const Nivel = {
    id_level:'',
    level_index:'',
    level_cost:'',
    descripcion:''
};

const comment = {
    userName:'',
    fk_user:'',
    comment_description:''
}

AddComment.addEventListener('click',function(){

    var m = document.getElementById("msg").value;
    Comentar(idCurso,m);
    document.getElementById("msg").value = "";
});

GoToChat.addEventListener('click',function(){
    OpenTeacherChat(idCurso);
});

Certificar.addEventListener('click', function(){
    ObtenerCertificado(idCurso);
});

StarLike.addEventListener('click',function(){
    DarQuitarLike(idCurso);
})

$(document).ready(function(){
    ShowCourse(idCurso);
    document.getElementById("msg").value = "";
});


function getScolarSVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-school" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>'
}
function getMoneySVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="7" y="9" width="14" height="10" rx="2" /><circle cx="14" cy="14" r="2" /><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" /></svg>';
}
function getBookSVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><line x1="3" y1="6" x2="3" y2="19" /><line x1="12" y1="6" x2="12" y2="19" /><line x1="21" y1="6" x2="21" y2="19" /></svg>'
}
function getCheckSVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>'
}
function LikedSVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="48" height="48" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>'
}
function noLikedSVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="48" height="48" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>'
}


async function ShowCourse(IDCURSO){

    // OBTIENE LOS DATOS DEL CURSO
    // const url = 'http://localhost/BDM%20Web%20Page/php/GetCourseByID.php?IdCourse='+IDCURSO;
    const url = 'php/GetCourseByID.php?IdCourse='+IDCURSO;
    const resultado = await fetch(url);
    var dbC = await resultado.json();

    // OBTIENE LOS NIVELES PERTENECIENTES AL CURSO
    // const url2 = 'http://localhost/BDM%20Web%20Page/php/GetLevelsByCourse.php?IdCourse='+IDCURSO;
    const url2 = 'php/GetLevelsByCourse.php?IdCourse='+IDCURSO;
    const resultado2 = await fetch(url2);
    var dbL = await resultado2.json();

    // title, course_description, t_user.userName as Maestro, full_price, level_quantity,t_course.fk_instructor
    // OBTIENE EL ULTIMO NIVEL PAGADO POR EL USUARIO
    // const urlP = 'http://localhost/BDM%20Web%20Page/php/GetLastLevelPaid.php?IdCourse='+IDCURSO;
    const urlP = 'php/GetLastLevelPaid.php?IdCourse='+IDCURSO;
    const resultadoP = await fetch(urlP);
    var dbPaid = await resultadoP.json();

    // SABER SI LE DIO LIKE AL CURSO 
    // const urlLike = 'http://localhost/BDM%20Web%20Page/php/GetLiked.php?IdCourse='+IDCURSO;
    const urlLike = 'php/GetLiked.php?IdCourse='+IDCURSO;
    const resultadoLike = await fetch(urlLike);
    var dbLike = await resultadoLike.json();
    if(dbLike)
    {
        if(dbLike.rating>0)
        {
            document.getElementById("DarLike").innerHTML=LikedSVG();
            Liked=1;
        }
        else
        {
            document.getElementById("DarLike").innerHTML=noLikedSVG();
            Liked=0;
        }
    }
    setLikes(dbC.general_rating);
    

    document.getElementById("TituloCurso").innerHTML = dbC.title;
    document.getElementById("DetallesCurso").innerHTML = dbC.course_description;
    //document.getElementByID('TotalLikes').innerHTML = dbC.general_rating;

    //SET INFORMACION DEL CURSO
    const container = document.querySelector(".summary-vacante");
    container.innerHTML = "";

        const e_DIV = document.createElement("DIV");
        e_DIV.classList.add("puesto-idioma");
        e_DIV.innerHTML = getBookSVG();
        const e_Title = document.createElement("p");
        e_Title.textContent=dbC.title;
        e_DIV.appendChild(e_Title);

         const e_DIV2 = document.createElement("DIV");
        e_DIV2.classList.add("puesto-direccion");
        e_DIV2.innerHTML = getScolarSVG();
        const e_Teacher = document.createElement("p");
        e_Teacher.textContent=dbC.Maestro;
        e_DIV2.appendChild(e_Teacher);

        const e_DIV3 = document.createElement("DIV");
        e_DIV3.classList.add("puesto-direccion");
        e_DIV3.innerHTML = getMoneySVG();
        const e_Money = document.createElement("p");
        e_Money.textContent=dbC.full_price;
        e_DIV3.appendChild(e_Money);

        const e_DIV4 = document.createElement("DIV");
        e_DIV4.classList.add("aInForm");
        const e_BuyLevel = document.createElement("button");
        // BOTON DE PAGO DE NIVEL
        if(dbPaid)
        {
            const nextLevel = +dbPaid.lastLevelPaid+ +1;
            e_BuyLevel.setAttribute("onClick", "BuyLevel('"+IDCURSO+"','"+ nextLevel +"')");//////////////////////////////////////Obtener el index del nivel xddd
        }
        else
        {
            e_BuyLevel.setAttribute("onClick", "BuyLevel('"+IDCURSO+"','"+1+"')");
        }
        
        e_BuyLevel.textContent = 'Comprar siguiente nivel;' 
        e_DIV4.appendChild(e_BuyLevel);

        const e_DIV5 = document.createElement("DIV");
        e_DIV5.classList.add("aInForm");
        const e_BuyCourse = document.createElement("button");
        // BOTON DE PAGO DE CURSO
        e_BuyCourse.setAttribute("onClick", "BuyLevel('"+IDCURSO+"','"+dbC.level_quantity+"')");
        e_BuyCourse.textContent = 'Comprar curso completo';
        e_DIV4.appendChild(e_BuyCourse);

        container.appendChild(e_DIV);
        container.appendChild(e_DIV2);
        container.appendChild(e_DIV3);
        container.appendChild(e_DIV4);
        container.appendChild(e_DIV5);
        //SET INFORMACION DEL CURSO
        //FALTA MOSTRAR LISTA DE NIVELES Y BLOQUEAR COMENT Y VOTOSI NO HA COMPRADO

    if(dbPaid)
        SetLevels(dbL,IDCURSO,dbPaid.lastLevelPaid,dbC.level_quantity);
    else
        SetLevels(dbL,IDCURSO,0,dbC.level_quantity);
    GetComments(IDCURSO);

}

async function SetLevels(jsonFile, IDCURSO, lastPaid, CantidadNiveles)
{
    // level_name, level_index, level_cost
//  OBTIENE EL PROGRESO DEL USUARIO 
    // const urlP = 'http://localhost/BDM%20Web%20Page/php/GetProgress.php?IdCourse='+IDCURSO;
    const urlP = 'php/GetProgress.php?IdCourse='+IDCURSO;
    const resultadoP = await fetch(urlP);
    var dbP = await resultadoP.json();

    const container = document.querySelector("#form-requisitos");
    container.innerHTML = "";

    const containerLevels = document.querySelector(".form-requisitos");
    container.innerHTML = "";

    jsonFile.forEach(Nivel => {
        const {id_level, level_index,level_cost, descripcion} = Nivel;

        //ContenedorVacantes.append('<section class="vacante sombra-blanca"><a href="detalle-vacante.html" class="vacante sombra-blanca"><div class="puesto-nombre"><h4>'Categoria'</h3></div><div class="puesto-idioma"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="7 8 3 12 7 16" /><polyline points="17 8 21 12 17 16" /><line x1="14" y1="4" x2="10" y2="20" /></svg><p>'db.title'</p></div><div class="puesto-direccion"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-school" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg><p>'db.firstname+db.last_name'</p></div><div class="puesto-sueldo"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><line x1="3" y1="6" x2="3" y2="19" /><line x1="12" y1="6" x2="12" y2="19" /><line x1="21" y1="6" x2="21" y2="19" /></svg><p>'db.full_price'</p></div></a></section>');

        const e_Section = document.createElement("DIV");
        if(level_index<=lastPaid)
        {
            //EN CASO DE ESTAR COMPRADO SETEA EL ONCLICK PARA IR AL NIVEL
            e_Section.setAttribute("onClick", "openWindow("+IDCURSO+", "+id_level+", "+level_index+")");
            e_Section.classList.add("comprado");
        }
        else
        {
            // CASO CONTRARIO SOLO SE VEN LOS DATOS
            e_Section.classList.add("requisito-element");
        }  
        //e_Section.classList.add("sombra-blanca");

        const e_Index = document.createElement("p");
        e_Index.classList.add("xp-element");
        e_Index.textContent = level_index;

        const e_Desc = document.createElement("p");
        e_Desc.classList.add("descripcion-element");
        e_Desc.textContent=descripcion;

        const e_Fin = document.createElement("DIV");
        if(dbP)
        if(dbP.progress>=level_index)
        {
            e_Fin.innerHTML=getCheckSVG();    
        }

        e_Section.appendChild(e_Index);
        e_Section.appendChild(e_Desc);
        e_Section.appendChild(e_Fin);

        containerLevels.appendChild(e_Section);
    });

    if(dbP)
    ShowButtonCertifcate(CantidadNiveles,dbP.progress);
    else
    ShowButtonCertifcate(CantidadNiveles,0);
}

async function GetComments(IDCURSO){

    // OBTIENE LOS COMENTARIOS DEL CURSO
    // const url3 = 'http://localhost/BDM%20Web%20Page/php/GetComments.php?id_curso='+IDCURSO;
    const url3 = 'php/GetComments.php?id_curso='+IDCURSO;
    const resultado3 = await fetch(url3);
    var dbCom = await resultado3.json();

    SetComments(dbCom);
}

async function SetComments(jsonFile){
    
    //  HACE LO NECESARIO PARA ESCRIBIR LOS COMENTARIOS EN LA SECCION DE COMENTARIOS
    const container = document.querySelector(".comment1");
    container.innerHTML="";

    jsonFile.forEach(Comment=>{
        const {userName,fk_user,comment_description} = Comment;


        const e_Nick = document.createElement("p");
        e_Nick.setAttribute("v-for",'items in item1');
        e_Nick.setAttribute("v-text","items1");
        e_Nick.setAttribute("id_user",fk_user);
        e_Nick.textContent=userName;

        const e_img = document.createElement("img");
        e_img.setAttribute('src','img/default-user-image.png');
        e_img.setAttribute('width','50');
        e_img.setAttribute('height','50');

        e_Com = document.createElement("p");
        e_Com.setAttribute("v-for",'items in item1');
        e_Com.setAttribute("v-text","items1");
        e_Com.textContent=comment_description;

        container.appendChild(e_Nick);
        container.appendChild(e_img);
        container.appendChild(e_Com);

        });

}

async function Comentar(idCurso,mensaje)
{
    // const url = "http://localhost/BDM%20Web%20Page/php/AddComment.php?idCurso="+idCurso+'&msg='+mensaje;
    const url = "php/AddComment.php?idCurso="+idCurso+'&msg='+mensaje;
    console.log(url);
    const resultado = await fetch(url);
    const json = await resultado.json();
    // console.log(json);
    GetComments(idCurso);
}

async function OpenTeacherChat(idCurso){

    // const url = 'http://localhost/BDM%20Web%20Page/php/GetCourseByID.php?IdCourse='+idCurso;
    const url = 'php/GetCourseByID.php?IdCourse='+idCurso;
    const resultado = await fetch(url);
    var dbChat = await resultado.json();

    // const urlP = 'http://localhost/BDM%20Web%20Page/php/GetLastLevelPaid.php?IdCourse='+idCurso;
    const urlP = 'php/GetLastLevelPaid.php?IdCourse='+idCurso;
    const resultadoP = await fetch(urlP);
    var dbPaid = await resultadoP.json();

    if(dbPaid)
    {
        // window.open("http://localhost/BDM%20Web%20Page/ChatView.html?Destiny="+dbChat.instructorID,'_self');
        window.open("ChatView.html?Destiny="+dbChat.instructorID,'_self');
    }
    else
        alert("Debes comprar al menos un nivel para poder contactar al profesor");
}

async function ShowButtonCertifcate(CantidadNiveles,progress){
    var x = document.getElementById("obtenerCertificado");
    
    if(CantidadNiveles==progress)
    {
        x.style.display = "block";
    }
    else
    {
        x.style.display="none";
    }
}

async function ObtenerCertificado(idCurso){

//-----Agregar las weas pa imprimirlo-----//

    // const url = 'http://localhost/BDM%20Web%20Page/php/GetCertificateData.php?IdCourse='+idCurso;
    const url = 'php/GetCertificateData.php?IdCourse='+idCurso;
    const resultado = await fetch(url);
    var dbCertificate = await resultado.json();

    // ya obtiene los datos llamados Emision, Titulo, Alumno, Maestro
    // window.open("http://localhost/BDM%20Web%20Page/GeneratePDF.html?Emision="+dbCertificate.Emision+"&Titulo="+dbCertificate.Titulo+"&Alumno="+dbCertificate.Alumno+"&Maestro="+dbCertificate.Maestro);
    window.open("GeneratePDF.html?Emision="+dbCertificate.Emision+"&Titulo="+dbCertificate.Titulo+"&Alumno="+dbCertificate.Alumno+"&Maestro="+dbCertificate.Maestro);
}

// SI DA LIKE O QUITA LIKE SE MANDA 1-DAR LIKE O 0-QUITAR LIKE 
async function DarQuitarLike(idCurso)
{
    if(Liked == 0)
    {
        // const url = 'http://localhost/BDM%20Web%20Page/php/LikeCurso.php?IdCourse='+idCurso+'&Like='+1;
        const url = 'php/LikeCurso.php?IdCourse='+idCurso+'&Like='+1;
        const resultado = await fetch(url);
        const json = await resultado.json();
        console.log(json);

        document.getElementById("DarLike").innerHTML=LikedSVG();
        Liked = 1;
    }
    else if(Liked == 1)
    {
        // const url = 'http://localhost/BDM%20Web%20Page/php/LikeCurso.php?IdCourse='+idCurso+'&Like='+0;
        const url = 'php/LikeCurso.php?IdCourse='+idCurso+'&Like='+0;
        const resultado = await fetch(url);
        const json = await resultado.json();
        console.log(json);

        document.getElementById("DarLike").innerHTML=noLikedSVG();
        Liked=0; 
    }

    // const urlC = 'http://localhost/BDM%20Web%20Page/php/GetCourseByID.php?IdCourse='+idCurso;
    const urlC = 'php/GetCourseByID.php?IdCourse='+idCurso;
    const resultadoC = await fetch(urlC);
    var dbC = await resultadoC.json();

    setLikes(dbC.general_rating);
}

// RECIBE EL RATING Y LO MUESTRA
async function setLikes(rating){
    var x = document.getElementById('TotalLikes');
    x.innerHTML = rating;
}

// FUNCION PARA MANDAR DATOS DE COMPRA DE UN CURSO COMPLETO
function BuyCourse(IDCurso,CoursePrice,LvlQuantity){
// window.open("http://localhost/BDM%20Web%20Page/Compra.html?idCurso="+IDCurso+'&Price='+CoursePrice+'&LvlQuantity='+LvlQuantity,'_self');
window.open("Compra.html?idCurso="+IDCurso+'&Price='+CoursePrice+'&LvlQuantity='+LvlQuantity,'_self');
}

// FUNCION PARA MANDAR DATOS DE COMPRA DE UN NIVEL
function BuyLevel(IDCurso, LvlIndex){
// window.open("http://localhost/BDM%20Web%20Page/Compra.html?id="+IDCurso+'&index='+LvlIndex,'_self');
window.open("Compra.html?id="+IDCurso+'&index='+LvlIndex,'_self');
}

function openWindow(idCurso, idLevel, indexLevel)
{
    // window.open("http://localhost/BDM%20Web%20Page/CursoNivel.html?idCurso="+idCurso+"&idLevel="+idLevel+"&indexLevel="+indexLevel,"_self");
    window.open("CursoNivel.html?idCurso="+idCurso+"&idLevel="+idLevel+"&indexLevel="+indexLevel,"_self");
}