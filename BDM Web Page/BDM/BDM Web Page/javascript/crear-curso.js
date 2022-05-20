const expandCategoryBtn = document.getElementById("expand-category-id");
const contractCategoryBtn = document.getElementById("contract-category-id");
const createCategory = document.getElementById("add-category");
const categoryNameInput = document.getElementById("category-name"); 
const categoryDescriptionInput = document.getElementById("category-description"); 
const nuevoNivel=document.getElementById("addLevel");
const crearCurso= document.getElementById("create-Course");
const NameEntered = document.getElementById("NameIn");
const CategorySelected = document.getElementById("categoryList");
const DescCourse = document.getElementById("DescCIn");
var Position=0;
var Price=document.getElementById("PriceIn");
var vid =document.getElementById("videoNameIn");
var description =document.getElementById("DescIn");
var documentInput=document.getElementById("documentNameIn");
var nivelesArray=[];
const courseImgInput = document.getElementById("course-photo-input");
//var NivelAux;
const addCategoButton=document.getElementById("addNewCategory");
var newCategoName=0;
var newCategoDesc=0;

var totalCost = 0;
var levelQuantity = 0;
const categoriaL={
    id: null, 
    nombre: "", 
    fk_creator: null, 
    creation_date: null, 
    catDescription:""
} 
class level{
    constructor (Position, Price, vid, description, documents){
    this.Posicion=Position,
    this.Precio=Price,
    this.Video=vid,
    this.Descripcion=description,
    this.documento=documents}
};

createCategory.hidden = true;
contractCategoryBtn.hidden = true;


expandCategoryBtn.addEventListener("click", function()
{
    expandCategoryBtn.hidden = true;
    contractCategoryBtn.hidden = false;
    createCategory.hidden = false;
});

contractCategoryBtn.addEventListener("click", function()
{
    expandCategoryBtn.hidden = false;
    contractCategoryBtn.hidden = true;
    createCategory.hidden = true;
});

nuevoNivel.addEventListener("click",function(e){

    Position=Position+1;
    // Price=document.getElementById("PriceIn").value;
    // vid =vid.files[0];
    // description =document.getElementById("DescIn").value;
    // documents=documentInput.files[0];
    addLevel(Position, Price.value,vid.files[0],description.value,documentInput.files[0]);
});

addCategoButton.addEventListener("click",function(e){
    
    newCategoName= document.getElementById("category-name").value; 
    newCategoDesc= document.getElementById("category-description").value;


    //AGREGA LA CATEGORIA A LA BD
    addCategory(newCategoName,newCategoDesc);

    //ACTUALIZA LA LISTA
    SetCategos();

});

crearCurso.addEventListener("click",function(){

    //var c = CategorySelected.getAttribute(id_catego);
    var c = $("#categoryList").find(':selected').attr('id_catego');

    var n = NameEntered.value;

    var d = DescCourse.value;

    createCourse(n,c,d);

})


$(document).ready(function(){
    SetCategos();
});

//INGRESA LOS NIVELES EN UN ARREGLO TEMPORAL AL AÑADIRLOS Y LOS MUESTRA EN PANTALLA 
async function addLevel(Pos,Cost,vidio,descript,docs){

    var NivelAux = new level(Pos,Cost,vidio,descript,docs);
    nivelesArray[Pos-1]={NivelAux};

    const container=document.querySelector(".level-container");

    const e_Level=document.createElement("DIV");
    e_Level.classList.add("level-unit");
    const e_titleH=document.createElement("H2");
    e_titleH.classList.add("level-title");
    e_titleH.textContent = "Nivel "+ Pos ;
    e_Level.appendChild(e_titleH);

    const e_Desc=document.createElement("P");
    e_Desc.classList.add("level-description");
    e_Desc.textContent=descript + "-----$"+Cost+" MXN-----";
    e_Level.appendChild(e_Desc);

        const e_Documents=document.createElement("DIV");
        e_Documents.classList.add("level-documents");
            const e_Video = document.createElement("P");
            e_Video.classList.add("level-video")
            e_Video.textContent= vidio.name;
            const e_Doc = document.createElement("P");
            e_Doc.classList.add("level-attachment");
            e_Doc.textContent=docs.name;
            e_Documents.appendChild(e_Video);
            e_Documents.appendChild(e_Doc);
    
    e_Level.appendChild(e_Documents);

    container.appendChild(e_Level); 
    totalCost += parseInt(Cost);
    levelQuantity += parseInt(1);
}

//CREA UNA NUEVA CATEGORIA (NO INCLUI DESCRIPCION DE CATEGORIA)
async function addCategory(name,description)
{
    
    // const url='http://localhost/BDM%20Web%20Page/php/CreateCategory.php?categoryName='+name+'&description='+description;
    const url='php/CreateCategory.php?categoryName='+name+'&description='+description;
    await fetch(url);
    // Add category .php
    SetCategos();
}

/*async function addCategoToList(name,description){

    const containerCat = document.querySelector(".categoryList");

}*/

// OBTIENE LA LISTA DE CATEGORIAS DE LA BASE DE DATOS
async function SetCategos(){

    // const urlC='http://localhost/BDM%20Web%20Page/php/GetCategorys.php'
    const urlC='php/GetCategorys.php'
    data = await fetch(urlC);
    var db = await data.json();
    updateCategories(db);
    
}

//ACTUALIZA EL DROPDOWN DE CATEGORIAS
async function updateCategories(jsonFile){

    const container = document.querySelector(".categoryList");
    container.innerHTML = "";

    jsonFile.forEach(categoriaL => {
        const {id, nombre, fk_creator, creation_date, catDescription} = categoriaL;

        const e_CategoName=document.createElement("OPTION");
        e_CategoName.setAttribute('value',nombre);
        e_CategoName.setAttribute('id_catego',id)
        e_CategoName.textContent = nombre;

        container.appendChild(e_CategoName);
    });
}

//CREA EL CURSO EN LA BD, ASI COMO LOS NIVELES Y LA RELACION CATEGORIA-CURSO
async function createCourse(Nombre, idCategoria, DescripcionC){

    var formdata = new FormData();
    const courseImgExt = courseImgInput.files[0].name.split('.').pop();
    const courseImg = new File([courseImgInput.files[0]], courseImgInput.files[0].name+"."+courseImgExt, {type: courseImgInput.files[0].type});
    formdata.append("image", courseImg);
    
    // const urlCurso = 'http://localhost/BDM%20Web%20Page/php/CreateCourse.php?title='+Nombre+'&description='+DescripcionC+'&cost='+totalCost+'&levelQuantity='+levelQuantity;
    const urlCurso = 'php/CreateCourse.php?title='+Nombre+'&description='+DescripcionC+'&cost='+totalCost+'&levelQuantity='+levelQuantity;
    $.ajax({
        type:'post',
        url: urlCurso,
        processData: false,
        contentType: false, 
        data: formdata,
        success: function(msg, status, jqXHR)
        {
            totalCost = 0;
            levelQuantity = 0;
            console.log("After create course: " + msg);
            const responseCourse = JSON.parse(msg);
            
            SetCategoryToCourse(idCategoria, responseCourse.ID);

            for (let i = 0; i < nivelesArray.length; i++) {
                
                var formdataLevel = new FormData();
                const fileExtLevDoc = nivelesArray[i].NivelAux.documento.name.split('.').pop();
                const DocLev = new File([nivelesArray[i].NivelAux.documento], nivelesArray[i].NivelAux.documento.name+"."+fileExtLevDoc, {type: nivelesArray[i].NivelAux.documento.type}); 
                formdataLevel.append("docx", DocLev);

                // const urlLevel='http://localhost/BDM%20Web%20Page/php/CreateLevel.php?fk_course='+responseCourse.ID+'&level_index='+nivelesArray[i].NivelAux.Posicion+'&level_cost='+nivelesArray[i].NivelAux.Precio+'&description='+nivelesArray[i].NivelAux.Descripcion;
                const urlLevel='php/CreateLevel.php?fk_course='+responseCourse.ID+'&level_index='+nivelesArray[i].NivelAux.Posicion+'&level_cost='+nivelesArray[i].NivelAux.Precio+'&description='+nivelesArray[i].NivelAux.Descripcion;
                
                $.ajax({
                    type:'post',
                    url: urlLevel,
                    processData: false,
                    contentType: false, 
                    data: formdataLevel,
                    success: function(msg, status, jqXHR)
                    {
                        console.log("Level #"+i+" created: "+ msg);
                        const responseLevelCreation  = JSON.parse(msg);

                        //Update video path
                        var formdataLevelVideo = new FormData();
                        const fileExtLevVid = nivelesArray[i].NivelAux.Video.name.split('.').pop();
                        const videoLev = new File([nivelesArray[i].NivelAux.Video], responseLevelCreation.ID+"."+fileExtLevVid, {type: nivelesArray[i].NivelAux.Video.type});
                        
                        formdataLevelVideo.append("photo", videoLev);
                        
                        // const urlUpdateLevelVideoPath = "http://localhost/BDM%20Web%20Page/php/UpdateLevelVideoPath.php?ID=" + responseLevelCreation.ID;
                        const urlUpdateLevelVideoPath = "php/UpdateLevelVideoPath.php?ID=" + responseLevelCreation.ID;
                        $.ajax({
                            type:'post',
                            url: urlUpdateLevelVideoPath,
                            processData: false,
                            contentType: false, 
                            data: formdataLevelVideo,
                            success: function(msg, status, jqXHR)
                            {
                                console.log("Level #"+i+" updated video path: " + msg);
                            },
                            error: function(xhr, status, error) 
                            {
                                var err = eval("(" + xhr.responseText + ")");
                                alert(err.Message);
                            }
                        });
                    },
                    error: function(xhr, status, error) 
                    {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    }
                });        
            }
            alert("Curso creado con éxito, favor de regresar");
        },
        error: function(xhr, status, error) 
        {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
    
    
}

//RELACION CATEGORIA-CURSO
async function SetCategoryToCourse(Categoria,Curso){
    // const urlCate='http://localhost/BDM%20Web%20Page/php/setCategoriaToCurso.php?courseID='+Curso+'&categoryID='+Categoria;
    const urlCate='php/setCategoriaToCurso.php?courseID='+Curso+'&categoryID='+Categoria;
    fetch(urlCate);
}