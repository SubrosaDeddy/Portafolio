
const TerminarNivel = document.getElementById("FinishLevel");
//const Titulo = document.getElementById("Nivel");
const NivelIndex = document.getElementById("Nivel")
const Description = document.getElementById("LabelInBox");
const FileDownload = document.getElementById("LevelFiles");



var docurl = new URL(document.URL);

var idCurso = docurl.searchParams.get("idCurso");
var idLevel = docurl.searchParams.get("idLevel");
var indexLevel = docurl.searchParams.get("indexLevel");



TerminarNivel.addEventListener("click",function(e){
	e.preventDefault();
 	FinishNivel(idCurso,idLevel, indexLevel);
});

FileDownload.addEventListener("click",function(e){
	e.preventDefault(e);
	DownloadFile(idLevel);
});

$(document).ready(function(){
	LoadLevel(idCurso,idLevel);
});

async function LoadLevel(Curso, Nivel){

	// const url='http://localhost/BDM%20Web%20Page/php/GetLevelByID.php?IdCourse='+Curso+'&IdLevel='+Nivel;
	const url='php/GetLevelByID.php?IdCourse='+Curso+'&IdLevel='+Nivel;
	const resultado = await fetch(url);
	var dbL = await resultado.json();


	// TITULO
	NivelIndex.innerHTML ='Nivel '+indexLevel;

	// VIDEO
	const container = document.querySelector(".user-img");
    container.innerHTML = "";

    const e_Video=document.createElement("video");
    e_Video.setAttribute('width','720');
    e_Video.setAttribute('height','480');
    e_Video.setAttribute('controls', "");
    
    const e_SRC=document.createElement("source");
    // e_SRC.setAttribute('src','http://localhost/BDM%20Web%20Page/'+dbL.videoPath);
    e_SRC.setAttribute('src',dbL.videoPath);
    e_SRC.setAttribute('type','video/mp4');

    const e_SRC2=document.createElement("source");
    // e_SRC2.setAttribute('src','http://localhost/BDM%20Web%20Page/'+dbL.videoPath);
    e_SRC2.setAttribute('src',dbL.videoPath);
    e_SRC2.setAttribute('type','video/ogg');

    e_Video.appendChild(e_SRC);
    e_Video.appendChild(e_SRC2);
    container.appendChild(e_Video);

	// DESCRIPCION
    Description.innerHTML = dbL.descripcion;
}

async function FinishNivel(Curso,Nivel, index)
{
	// const urlL='http://localhost/BDM%20Web%20Page/php/FinishLevel.php?IdCourse='+Curso+'&IdLevel='+Nivel+'&levelIndex='+index;
	const urlL='php/FinishLevel.php?IdCourse='+Curso+'&IdLevel='+Nivel+'&levelIndex='+index;
	await fetch(urlL);
	goBack();
}
function goBack() {
  window.history.back();
}


async function DownloadFile(Level){

	// const urlF = 'http://localhost/BDM%20Web%20Page/php/GetLevelFile.php?IdLevel='+Level;
	const urlF = 'php/GetLevelFile.php?IdLevel='+Level;
	const resultadoF = await fetch(urlF);
	var dbF = await resultadoF.json();


	const container = document.getElementById("Documentos");
    container.innerHTML = "";

	const link = document.createElement('a');

	var timestamp = new Date().getTime();

	link.setAttribute('href',"PDFS/"+Level+".pdf?t="+timestamp);
	link.setAttribute('download','');
	const e_down = document.createElement('p');
	e_down.setAttribute('id','LevelFiles');
	e_down.classList.add('PinBox');
	e_down.textContent='Descargar Documento';

	link.appendChild(e_down);
	container.appendChild(link);
}