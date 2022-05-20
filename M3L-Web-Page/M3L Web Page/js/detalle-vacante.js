const buttonSend = document.getElementById("btn-enviar");
const inputCV = document.getElementById("myFileCV");

var percentage = 0;

const vacante = 
{
    pk_position: null,
    fk_sector: null,
    title: '',
    positionDescription: '',
    salary: '',
    location: '',
    sectorTitle: ''
}

const requirement =
{
    pk_requirement: null,
    fk_position: null,
    requirementDescription: '',
    yearsRequired: null
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();

    var updateBar = window.setInterval(function()
    {
        const elements = $(".input-element");
        const max = elements.length;

        let filled = 0;
        for (let i = 0; i < max; i++) {
            if(elements[i].value != "" && elements[i].value != null && elements[i].value != "undefined")
            {
                filled++;
            }
        }
        percentage = 100/max * filled;
        if(filled == max)
        percentage = 100;
        $( "#progressbar" ).progressbar({
            value: percentage,
          });
    }, 500);

    console.log(getCookie("firstVisit"));
    if(getCookie("firstVisit") != "false")
    {
        introJs().setOptions({
            steps: 
            [
                {
                intro: "Bienvenido! A continuación te mostraremos los pasos para enviar tu solicitud"
                }
                , {
                element: document.querySelector('#position-detail'),
                intro: "Aquí puedes leer la descripción del puesto."
                }
                , {
                element: document.querySelector('#summary-vacante'),
                intro: "Los detalles más relevantes se muestran aquí."
                }
                , {
                element: document.querySelector('#requirements-form'),
                intro: "Aquí se muestra una lista de los los requerimientos del puesto. Llene cada uno de los apartados antes de enviar su solicitud."
                }
                , {
                element: document.querySelector('#load-file'),
                intro: "O puede enviarnos su curriculum."
                }
                , {
                element: document.querySelector('#btn-enviar'),
                intro: "Una vez haya llenado todos los requisitos o cargado su currículum envíenos su solicitud, nosotros la revisaremos con gusto."
                }
            ]
        }).start();
        document.cookie = "firstVisit=false";
    }

});

$(document).ready(function()
{
    $('#btn-enviar').click(function()
    {
        sendRequest();
    });
});

$(function()
{
    $( "#progressbar" ).progressbar({
        value: percentage,
      });
});

function iniciarApp()
{
    loadVacante();
    loadRequirements();
}

async function loadVacante()
{
    try
    {
        var docurl = new URL(document.URL);
        var id = docurl.searchParams.get("id");

        const url = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/PositionDetail.php?id='+id;
        const resultado = await fetch(url);
        const db = await resultado.json();

        const {pk_position, fk_sector, title, positionDescription, salary, location, sectorTitle} = db;

        const e_title = document.getElementById("position-title");
        e_title.textContent = title;
        const e_detail = document.getElementById("position-detail");
        e_detail.textContent = positionDescription;

        const e_languages = document.getElementById("position-languages");
        e_languages.textContent = "Español, inglés";

        const e_location = document.getElementById("position-location");
        e_location.textContent = location;

        const e_salary = document.getElementById("position-salary");
        // e_salary.textContent = '$'+salary+' MXN';
        e_salary.textContent = moneyFormat(salary, "MXN");

        const e_positionPath = document.getElementById("position-path");
        var path = "Oferta/"+sectorTitle+"/"+title;
        if(path.length >38)
        {
            path = path.substring(0, 35);
            path += "..."
        }
        e_positionPath.textContent = path;

        const urlVisit = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/VisitSector.php?value='+1+'&sector='+fk_sector;
        await fetch(urlVisit);
    }
    catch(error)
    {
        console.log(error);
    }
}

async function loadRequirements()
{
    try
    {
        var docurl = new URL(document.URL);
        var id = docurl.searchParams.get("id");

        const url = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/PositionRequirements.php?id='+id;

        const resultado = await fetch(url);

        const db = await resultado.json();

        const e_requirementForm = document.getElementById("requirements-form");
        db.forEach(requirement => {
            const {pk_requirement, fk_position, requirementDescription, yearsRequired} = requirement;

            const e_requirementDiv = document.createElement("DIV");
            e_requirementDiv.classList.add("requisito-element");

            const e_requirementDescription = document.createElement("P");
            e_requirementDescription.classList.add("descripcion-element");
            e_requirementDescription.textContent = requirementDescription;

            const e_RequirementXP = document.createElement("P");
            e_RequirementXP.classList.add("xp-element");
            e_RequirementXP.textContent = yearsRequired + " años";

            const e_RequirementInput = document.createElement("INPUT");
            e_RequirementInput.classList.add("sombra-blanca");
            e_RequirementInput.classList.add("input-element");
            e_RequirementInput.type = "number";

            e_requirementDiv.appendChild(e_requirementDescription);
            e_requirementDiv.appendChild(e_RequirementXP);
            e_requirementDiv.appendChild(e_RequirementInput);

            e_requirementForm.appendChild(e_requirementDiv);

        });

        
    }
    catch(error)
    {
        console.log(error);
    }
}

function sendRequest()
{
    const inputExp =  document.querySelectorAll("input.input-element");
    var filled = true;
    for (let i = 0; i < inputExp.length; i++) {
        if(inputExp[i].value < 0 || inputExp[i].value == "" || inputExp[i].value == "undefined" || inputExp[i].value == null)
        {
            filled = false;
        }
        console.log(inputExp[i].value);
    }
    if(inputCV.value != null && inputCV.value != "undefined"  && inputCV.value != "")
    {
        filled = true;
    }

    if(filled)
    {
        alert("Solicitud enviada con éxito");
    }
    else
    {
        alert("Faltan datos para enviar su solicitud");
    }
}

function getLanguageSVG()
{
    return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-language" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c8fa3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7h7m-2 -2v2a5 8 0 0 1 -5 8m1 -4a7 4 0 0 0 6.7 4" /><path d="M11 19l4 -9l4 9m-.9 -2h-6.2" /></svg>';
}

function getDirectionSVG()
{
    return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-2" width="36" height="36" viewBox="0 0 24 24" stroke-width="2.5" stroke="#b82321" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="18" y2="6.01" /><path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" /><polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" /><line x1="9" y1="4" x2="9" y2="17" /><line x1="15" y1="15" x2="15" y2="20" /></svg>';
}

function getSalarySVG()
{
    return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2E8B57" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="7" y="9" width="14" height="10" rx="2" /><circle cx="14" cy="14" r="2" /><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" /></svg>';
}

function moneyFormat(amount, currency = "MXN")
{
    var result = amount.toString();
    const iterations = amount.length % 3;

    for (let i = 0; i < iterations; i++) 
    {
        if((amount.length - i * 3) < amount.length)
        var result = result.slice(0, (amount.length - i * 3)) + "," + result.slice((amount.length - i * 3));
      }

      return '$'+result+' '+currency;
}

function getCookie(cname) 
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}