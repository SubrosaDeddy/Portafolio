const sector = {
    key: null,
    title: '',
    description: '',
    svg: ''
}

const offerTab = document.getElementById("tab4-1");

// const userTopLabel = document.getElementById("user-top-label");

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

$(document).ready(function()
{
    $("#datepicker").datepicker({
        changeYear: true,
        dateFormat : 'dd/mm/yy',
        });
});

offerTab.addEventListener('click', function()
{
    loadSectors();
});

function iniciarApp()
{
    loadSectors();
}

async function loadSectors()
{
    try
    {
        const container = document.getElementById("offers-container");
        container.innerHTML = "";
        const url = 'http://localhost/M3L-Web-Page/M3L%20Web%20Page/php/Sectors.php';

        const resultado = await fetch(url);

        const db = await resultado.json();

        db.forEach(sector => {
            const {pk_sector, sectorTitle, sectorDescription, svg} = sector;

            const e_sectorSection = document.createElement("SECTION");
            e_sectorSection.setAttribute("onClick", "openWindow("+pk_sector+", '"+sectorTitle+"')");
            e_sectorSection.classList.add("offer");
            e_sectorSection.classList.add("sombra-blanca");

            const e_sectorTitle = document.createElement("H3");
            e_sectorTitle.textContent = sectorTitle;

            const e_iconDiv = document.createElement("DIV");
            e_iconDiv.classList.add("iconos");
            e_iconDiv.innerHTML = svg;
            
            const e_sectorDescription = document.createElement("P");
            e_sectorDescription.textContent = sectorDescription;

            e_sectorSection.appendChild(e_sectorTitle);
            e_sectorSection.appendChild(e_iconDiv);
            e_sectorSection.appendChild(e_sectorDescription);

            // document.querySelector(".job-offers").appendChild(e_sectorSection);
            container.appendChild(e_sectorSection);
        });

    }
    catch(error)
    {
        console.log(error);
    }
}

function openWindow(id, sector){
    window.open("http://localhost/M3L-Web-Page/M3L%20Web%20Page/vacantes.html?sector="+sector+"&id="+id,"Vacantes");
}