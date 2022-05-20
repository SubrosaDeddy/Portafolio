const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupBtn = document.getElementById("signup-btn");

const usernameError = document.getElementById("error-user");
const emailError = document.getElementById("error-email");
const passwordError = document.getElementById("error-password");

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

const errorUserLength = document.getElementById("error-user-length");
const errorPasswordLength = document.getElementById("error-password-length");
const errorPasswordUpperCase = document.getElementById("error-password-uppercase");
const errorPasswordSC = document.getElementById("error-password-sc");
const errorEmailFormat = document.getElementById("error-email-format");

const loginBtn = document.getElementById("btn-login");
const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-pass");

const userTopLabel = document.getElementById("user-top-label");

// const registrationForm = document.getElementById("signup-form");

document.addEventListener('DOMContentLoaded', function() {
    usernameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";

    errorUserLength.style.display = "none";
    errorPasswordLength.style.display = "none";
    errorPasswordUpperCase.style.display = "none";
    errorPasswordSC.style.display = "none";
    errorEmailFormat.style.display = "none";

    loadUser()
});

$(document).ready(function() {
    $(signupForm).validate({
        rules: {
            username:
            {
                required: true,
                minlength: 8
            },
            email:
            {
                required: true,
                email: true
            },
            password:
            {
                required: true,
                minlength: 8
            }
        },
        messages:{
            username: 
            {
                required: "Requisito.",
                minlength: "Mínimo 8 caracteres."
            },
            email: 
            {
                required: "Requisito.",
                email: "Formato incorrecto."
            },
            password: 
            {
                required: "Requisito.",
                minlength: "Mínimo 8 caracteres."
            }
        }
    });

    $(".signOut").fadeOut();
  });

$(function()
  {
      $(signupForm).bind("submit", function(e)
      {
        e.preventDefault();
        if($(signupForm).valid()){
            $.ajax({
                type:'POST',
                url: 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/InsertUser.php',
                data: $(signupForm).serialize(),
                success: function(msg, status, jqXHR)
                {
                    console.log("Aquí entramos");
                    const json = JSON.parse(msg);
                    if(json.ID != null && json.ID != "undefined")
                    {
                        sendEmail(signupUsername.value);
                        alert("Enviamos un correo de confirmación a: "+signupEmail.value);
                        userTopLabel.innerHTML = signupUsername.value;
                        signIn(signupUsername.value, signupEmail.value);
                    }
                    else
                    {
                        alert("Hubo un error de nuestra parte. El usuario no pudo ser creado");
                    }
                },
                error: function(xhr, status, error) 
                {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });
        }
      })

      $("#signOutBtn").click(function()
      {
        $.ajax({
            type:'POST',
            url: 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/CloseSession.php',
            success: function(msg, status, jqXHR)
            {
                console.log("Sesión cerrada");
                signOut();
            },
            error: function(xhr, status, error) 
            {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
      })
});

loginBtn.addEventListener("click", function()
{
    validateLogin(loginEmail.value, loginPass.value);
});

async function loadUser()
{
    try
    {
        const url = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/GetLoggedUser.php';
        const resultado = await fetch(url);
        const db = await resultado.json();

        if(db)
        {
            $(userTopLabel).html(db.username);
            signIn(db.username, db.email);
        }

    }
    catch(error)
    {
        console.log(error);
    }
}

function signIn(username, email)
{
    userTopLabel.innerHTML = username;
    $(".signIn").fadeOut(1000);
    $(".logIn").fadeOut(1000);
    $("#signedInUsername").html(username);
    $("#signedInEmail").html(email);
    $(".signOut").fadeIn(1000);
}

function signOut()
{
    userTopLabel.innerHTML = "Usuario";
    $(".signIn").fadeIn(1000);
    $(".logIn").fadeIn(1000);
    // $("#signedInUsername").html(username);
    // $("#signedInEmail").html(email);
    $(".signOut").fadeOut(1000);
    loginEmail.value = "";
    loginPass.value = "";
}

async function insertUser(username, email, password)
{
        console.log("Entra");
        const url = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/InsertUser.php?user='+username+'&mail='+email+'&password='+password;
    
        const resultado = await fetch(url);
        const db = resultado.json();
        const ID = db.ID;

        if(ID == "undefined" || ID == "")
        {
            alert("Hubo un error de nuestra parte. El usuario no pudo ser creado");
        }
        else
        {
            sendEmail(signupUsername.value);
            alert("Enviamos un correo de confirmación a: "+signupEmail.value);
            userTopLabel.innerHTML = username;
        }
}

async function validateLogin(inputEmail, inputPass)
{
    const url = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/Login.php?email='+inputEmail;
    const resultado = await fetch(url);
    const db = await resultado.json();
    const pk_user = db.pk_user;
    const username = db.username;
    const email = db.email;
    const pass = db.pass;

    if(pk_user == "undefined" || pk_user == "")
    {
        alert("Undefined");
        // alert("Usuario o contraseña incorrecta");
    }
    else if(inputPass != pass)
    {
        alert(pass);
        alert("Usuario o contraseña incorrecta");
    }
    else
    {
        signIn(username, email);
    }
}

async function sendEmail(name)
{
    const url = "http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/SendMail.php?name="+name;
    await fetch(url);
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

function mostrarError(mensaje, element, color) {
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('error');
    alerta.style.color = color;

    element.appendChild(alerta);

    // setTimeout(() => {
    //     alerta.remove();
    // }, 3000);
}

