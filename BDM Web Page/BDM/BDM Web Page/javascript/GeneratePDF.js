document.addEventListener('DOMContentLoaded', function() {
    
    var docurl = new URL(document.URL);
    var Emision = docurl.searchParams.get("Emision");
    var Titulo = docurl.searchParams.get("Titulo");
    var Alumno = docurl.searchParams.get("Alumno");
    var Maestro = docurl.searchParams.get("Maestro");
    
    document.getElementById("Emision").innerHTML = Emision;
    document.getElementById("Titulo").innerHTML = Titulo;
    document.getElementById("Alumno").innerHTML = Alumno;
    document.getElementById("Maestro").innerHTML = "Otorga: " + Maestro;
    generatePDF();
});

const certificado = document.getElementById("p1dimg1");
// const certificado = document.getElementById("page_1");

function generatePDF()
{
    var opt = {
        margin:       0,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 1 },
        jsPDF:        { unit: 'in', format: 'A0', orientation: 'landscape' }
      };

    html2pdf()
    .set(opt)
    .from(certificado)
    .save();
}