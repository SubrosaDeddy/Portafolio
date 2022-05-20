var docurl = new URL(document.URL);
var languageCombo = document.getElementById("languageCombo");
var sector = docurl.searchParams.get("sector");
var idSector = docurl.searchParams.get("id");
var minPay = document.getElementById("minPay");
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("search-button");
languageCombo.addEventListener('change', requestPositions);
searchButton.addEventListener("click", requestPositions);

const vacante = {
    pk_position: null,
    fk_sector: null,
    title: '',
    positionDescription: '',
    salary: '',
    location: ''
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp()
{
    loadVacantes();
}

async function loadVacantes()
{
    try
    {
        // var docurl = new URL(document.URL);
        // var sector = docurl.searchParams.get("sector");
        // var id = docurl.searchParams.get("id");

        // console.log(sector);
        // console.log(id);
    
        var path = "Oferta/"+sector;
        if(path.length >38)
        {
            path = path.substring(0, 35);
            path += "..."
        }
        
        document.getElementById("sector-path").textContent = path;

        const url = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/Positions.php?sector='+idSector;
        const resultado = await fetch(url);
        const db = await resultado.json();
        updateContent(db);

        const urlVisit = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/VisitSector.php?value='+3+'&sector='+idSector;
        await fetch(urlVisit);
        // db.forEach(vacante => {
        //     const {pk_position, fk_sector, title, positionDescription, salary, location} = vacante;

        //     const e_positionSection = document.createElement("SECTION");
        //     e_positionSection.setAttribute("onClick", "openWindow('"+pk_position+"')");
        //     e_positionSection.classList.add("vacante");
        //     e_positionSection.classList.add("sombra-blanca");

        //     const e_positionTitle = document.createElement("DIV");
        //     e_positionTitle.classList.add("puesto-nombre");
        //     const e_positionTitleH4 = document.createElement("H4");
        //     e_positionTitleH4.textContent = title
        //     e_positionTitle.appendChild(e_positionTitleH4);

        //     const e_positionLanguage = document.createElement("DIV");
        //     e_positionLanguage.classList.add("puesto-idioma");
        //     e_positionLanguage.innerHTML = getLanguageSVG();
        //     const e_positionLanguageP = document.createElement("P");
        //     e_positionLanguageP.textContent = "Español, inglés"
        //     e_positionLanguage.appendChild(e_positionLanguageP);

        //     const e_positionDirection = document.createElement("DIV");
        //     e_positionDirection.classList.add("puesto-direccion");
        //     e_positionDirection.innerHTML = getDirectionSVG();
        //     const e_positionDirectionP = document.createElement("P");
        //     e_positionDirectionP.textContent = location;
        //     e_positionDirection.appendChild(e_positionDirectionP);

        //     const e_positionSalary = document.createElement("DIV");
        //     e_positionSalary.classList.add("puesto-sueldo");
        //     e_positionSalary.innerHTML = getSalarySVG();
        //     const e_positionSalaryP = document.createElement("P");
        //     // e_positionSalaryP.textContent = "$" + salary + " MXN";
        //     e_positionSalaryP.textContent = moneyFormat(salary, "MXN");
        //     e_positionSalary.appendChild(e_positionSalaryP);

        //     e_positionSection.appendChild(e_positionTitle);
        //     e_positionSection.appendChild(e_positionLanguage);
        //     e_positionSection.appendChild(e_positionDirection);
        //     e_positionSection.appendChild(e_positionSalary);

        //     document.querySelector(".contenedor-vacantes").appendChild(e_positionSection);
        // });

    }
    catch(error)
    {
        console.log(error);
    }
}

function requestPositions()
{
    // crearlo
    var xhr = new XMLHttpRequest();

    // console.log("Sector: " + idSector);
    // console.log("Language: " + languageCombo.value);
    // console.log("Paga mínima: " + minPay.value);
    // console.log("Búsqueda: " + searchInput.value);

    // abrirlo
    xhr.open("GET", "http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/Positions.php?sector="+idSector+"&language="+languageCombo.value+"&minPay="+minPay.value+"&search="+searchInput.value, true);
    
    // revisar que cambie
    xhr.onreadystatechange = function() {
        //console.log(xhr.readyState);
        
        if(xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            updateContent(json);
            console.log("Updated");
        } 
    };

    xhr.send();  
}

async function updateContent(jsonFile)
{
    // const db = await archive.json();
    const container = document.querySelector(".contenedor-vacantes");
    container.innerHTML = "";

    jsonFile.forEach(vacante => {
        const {pk_position, fk_sector, title, positionDescription, salary, location} = vacante;

        const e_positionSection = document.createElement("SECTION");
        e_positionSection.setAttribute("onClick", "openWindow('"+pk_position+"')");
        e_positionSection.classList.add("vacante");
        e_positionSection.classList.add("sombra-blanca");

        const e_positionTitle = document.createElement("DIV");
        e_positionTitle.classList.add("puesto-nombre");
        const e_positionTitleH4 = document.createElement("H4");
        e_positionTitleH4.textContent = title
        e_positionTitle.appendChild(e_positionTitleH4);

        const e_positionLanguage = document.createElement("DIV");
        e_positionLanguage.classList.add("puesto-idioma");
        e_positionLanguage.innerHTML = getLanguageSVG();
        const e_positionLanguageP = document.createElement("P");
        e_positionLanguageP.textContent = "Español, inglés"
        e_positionLanguage.appendChild(e_positionLanguageP);

        const e_positionDirection = document.createElement("DIV");
        e_positionDirection.classList.add("puesto-direccion");
        e_positionDirection.innerHTML = getDirectionSVG();
        const e_positionDirectionP = document.createElement("P");
        e_positionDirectionP.textContent = location;
        e_positionDirection.appendChild(e_positionDirectionP);

        const e_positionSalary = document.createElement("DIV");
        e_positionSalary.classList.add("puesto-sueldo");
        e_positionSalary.innerHTML = getSalarySVG();
        const e_positionSalaryP = document.createElement("P");
        // e_positionSalaryP.textContent = "$" + salary + " MXN";
        e_positionSalaryP.textContent = moneyFormat(salary, "MXN");
        e_positionSalary.appendChild(e_positionSalaryP);

        e_positionSection.appendChild(e_positionTitle);
        e_positionSection.appendChild(e_positionLanguage);
        e_positionSection.appendChild(e_positionDirection);
        e_positionSection.appendChild(e_positionSalary);

        // document.querySelector(".contenedor-vacantes").appendChild(e_positionSection);
        container.appendChild(e_positionSection);
    });
}

function openWindow(position)
{
    window.open("http://localhost/M3L-Web-Page/M3L%20Web%20Page/detalle-vacante.html?id="+position ,"Detalle vacante");
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