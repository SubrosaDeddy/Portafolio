//TODO ESTO CHECAR

const BusquedaAvanzada = document.getElementById("BusquedaAvanzada");
const ContenedorVacantes = document.getElementById(".Contenedor-Vacantes");

const Curso = {
    id_course: null,
    id_instructor: null,
    first_name:'',
    last_name:'',
    title: '',
    full_price: '',
    level_quantity: ''
};

var docurl = new URL(document.URL);

var catego = docurl.searchParams.get("category");


$(document).ready(function(){
    SearchCourses(catego);
});

//var htmlFragment = 
async function SearchCourses(Categoria){
    // const url = 'http://localhost/BDM%20Web%20Page/php/CourseByCategory.php?category='+Categoria;
    const url = 'php/CourseByCategory.php?category='+Categoria;
    const resultado = await fetch(url);
    var db = await resultado.json();
    updateContent(db);

    //CHECAR TXT QUE MANDO DANI; UPDATECONTENT();
    // ContenedorVacantes.append('<section class="vacante sombra-blanca"><a href="detalle-vacante.html" class="vacante sombra-blanca"><div class="puesto-nombre"><h4>'Categoria'</h3></div><div class="puesto-idioma"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="7 8 3 12 7 16" /><polyline points="17 8 21 12 17 16" /><line x1="14" y1="4" x2="10" y2="20" /></svg><p>'db.title'</p></div><div class="puesto-direccion"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-school" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg><p>'db.firstname+db.last_name'</p></div><div class="puesto-sueldo"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><line x1="3" y1="6" x2="3" y2="19" /><line x1="12" y1="6" x2="12" y2="19" /><line x1="21" y1="6" x2="21" y2="19" /></svg><p>'db.full_price'</p></div></a></section>');
}

async function SearchCoursesAdvanced()
{
    const text = document.getElementById("BusquedaAvanzada");
    // const url = "http://localhost/BDM%20Web%20Page/php/AdvancedSearch.php?text="+text.value+"&category="+catego;
    const url = "php/AdvancedSearch.php?text="+text.value+"&category="+catego;
    const resultado = await fetch(url);
    var db = await resultado.json();
    updateContent(db);
}

function getScolarSVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-school" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>'
}
function getMoneySVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="7" y="9" width="14" height="10" rx="2" /><circle cx="14" cy="14" r="2" /><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" /></svg>';
}
function getBookSVG(){
return '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><line x1="3" y1="6" x2="3" y2="19" /><line x1="12" y1="6" x2="12" y2="19" /><line x1="21" y1="6" x2="21" y2="19" /></svg>'
}
function openWindow(position)
{
    // window.open("http://localhost/BDM%20Web%20Page/detalle-vacante.html?id="+position ,/*"Detalle vacante"*/'_self');
    window.open("detalle-vacante.html?id="+position ,/*"Detalle vacante"*/'_self');
}

function updateContent(jsonFile)
{
    // const db = await archive.json();
    const container = document.querySelector(".contenedor-vacantes");
    container.innerHTML = "";

    jsonFile.forEach(Curso => {
        const {id_course, id_instructor,title, first_name, last_name, level_quantity, full_price} = Curso;

        //ContenedorVacantes.append('<section class="vacante sombra-blanca"><a href="detalle-vacante.html" class="vacante sombra-blanca"><div class="puesto-nombre"><h4>'Categoria'</h3></div><div class="puesto-idioma"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00bfd8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="7 8 3 12 7 16" /><polyline points="17 8 21 12 17 16" /><line x1="14" y1="4" x2="10" y2="20" /></svg><p>'db.title'</p></div><div class="puesto-direccion"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-school" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg><p>'db.firstname+db.last_name'</p></div><div class="puesto-sueldo"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#009988" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><line x1="3" y1="6" x2="3" y2="19" /><line x1="12" y1="6" x2="12" y2="19" /><line x1="21" y1="6" x2="21" y2="19" /></svg><p>'db.full_price'</p></div></a></section>');

        const e_Section = document.createElement("section");
        e_Section.setAttribute("onClick", "openWindow('"+id_course+"')");

        e_Section.classList.add("vacante");
        e_Section.classList.add("sombra-blanca");

        const e_title = document.createElement("div");
        e_title.classList.add("puesto-nombre");
        const e_titleH = document.createElement("h4");
        e_titleH.textContent = title;
        e_title.appendChild(e_titleH);

        const e_instructor = document.createElement("div");
        e_instructor.classList.add("puesto-idioma");
        e_instructor.innerHTML = getScolarSVG();
        const e_instructorP = document.createElement("p");
        e_instructorP.textContent = first_name+last_name;
        e_instructor.appendChild(e_instructorP);

        const e_price = document.createElement("div");
        e_price.classList.add("puesto-idioma");
        e_price.innerHTML = getMoneySVG();
        const e_pricep = document.createElement("p");
        e_pricep.textContent = "$"+full_price+" MXN";
        e_price.appendChild(e_pricep);

        const e_quantity = document.createElement("div");
        e_quantity.classList.add("puesto-sueldo");
        e_quantity.innerHTML = getBookSVG();
        const e_quantityp = document.createElement("p");
        e_quantityp.textContent= level_quantity + " niveles";
        e_quantity.appendChild(e_quantityp);

        e_Section.appendChild(e_title);
        e_Section.appendChild(e_instructor);
        e_Section.appendChild(e_price);
        e_Section.appendChild(e_quantity);

        container.appendChild(e_Section);

    });
}

