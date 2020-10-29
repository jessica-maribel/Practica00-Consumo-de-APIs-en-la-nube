//3275332375923204
//const { isEmptyObject } = require("jquery");

var paginacion = [0, 0, 4];
var data;
const DIV = 5;
var maximo_paginas;
//document.querySelector('#get_memes').addEventListener('click', function(){
  //  obtenerDatos('get_memes');
//});


/**document.querySelector('#caption_image').addEventListener('click', function(){
    obtenerDatos('caption_image');
});
*/

function aviso(){
    document.getElementById("main_notice").classList.add("e_hidden");
}

function showNotice(notice, notice_type){
    document.getElementById("main_notice").classList = '';
    document.getElementById("main_notice").classList.add("notice_container");
    document.getElementById("main_notice").classList.add("notice_type");
    document.getElementById("notice").innerHTML = "<span>"+notice+"</span>";

}

function  searchMemes(){

    aviso();
    var memesN = document.getElementById("search-memes-input").value;

    let url=("https://superheroapi.com/api.php/3275332375923204/search/"+memesN);

    if (window.XMLHttpRequest) {
        api = new XMLHttpRequest();
    } else {
        api = new ActiveXObject("Microsoft.XMLHTTP");
    }
    api.open('GET', url, true);
    api.responseType = 'json';
    console.log(url)
    api.onreadystatechange = function(){
        console.log("aqui");
        if ( this.readyState == 4  &&  this.status == 200  ) {
            data = api.response;
            paginacion= [0, 0, 5];
            document.getElementById("loading").classList.add("e_hidden");
            document.getElementById("background").classList.add("e_hidden");
            print(data);
            console.log("aqui");
        }
    };
    api.send();
    document.getElementById("loading").classList.remove("e_hidden");
    document.getElementById("background").classList.remove("e_hidden");
}
/*
function obtenerDatos(valor){
    console.log('HIZO CLICK');
    

    //Consultar con ajax
    const api = new XMLHttpRequest();
    api.open('GET', url, true);

    api.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText)
            console.log(datos.data.memes);
            let resultado = document.querySelector('#resultado')
            resultado.innerHTML = '';
             
            let a =0;
            for ( let i of datos.data.memes){
                a++;
                resultado.innerHTML += `<li>${i.id} |  ${i.name}</li>`;
                if (a>10){
                    break;
                }
            }
        } 
       }
    api.send();
}
*/


//Imprimir



function print(){
    console.log(data);
    var table = document.getElementById("memes-tabla");
    var data_head = `<thead class = "thead-white" bg-light pt-4>
    <tr>
        
        <th>Apariencia del Heroe</th>
        <th>Biografía</th>
        <th>Conexiones</th>
        <th>Poder</th>
        <th>Trabajos</th>
        <th>ID</th>
        <th>Imagen</th>
        <th>Nombres</th>
    </tr>
    </thead>
    <tbody>`;
    var memes = "";
    if (data.response === "error"){
        showNotice("No existe registros, vuelva a Intentar." , "bg-warning");
        clearNav();
    }else{
        maximo_paginas = Math.trunc((data.results.length - 1 )/DIV);
        var min = paginacion[0]*DIV;
        var max = min + (DIV-1);
        if (max >= data.results.length){
            max = data.results.length-1;
        }
        memes = getMemes(data,min,max);
        setNavPages();
    }
    table.innerHTML = data_head + memes + "</tbody>";
}

function getMemes(data,min,max){
    var data_string = "";
    for(var i = min; i <= max; i++){
        data_string = data_string + "<tr>"
            // La apariencia del Heroe
            + " <td>" 
                + "<strong>Género: </strong>" + data.results[i].appearance.gender + "<br>"
                + "<strong>Raza: </strong>" + data.results[i].appearance.race + "<br>"
                + "<strong>Altura: </strong>" + data.results[i].appearance.height['1'] + "<br>"
                + "<strong>Peso: </strong>" + data.results[i].appearance.weight['0'] + "<br>" 
            + " </td>"
            //Biografias del Heroe 
            + " <td>" 
                + "<strong>Nombres : </strong>" + data.results[i].biography['full-name'] + "<br>"
                + "<strong>Primera aparición: </strong>" + data.results[i].biography['first-appearance'] + "<br>"
                + "<strong>Lugar de nacimiento: </strong>" + data.results[i].biography['place-of-birth'] + "<br>"
            + " </td>"
            //Las conexiones del Heroe
            + " <td>" 
                + "<strong>Grupo/Afiliación: </strong>" + data.results[i].connections['group-affiliation'] + "<br>"
                
            + " </td>"
            // Las habilidades de cada heroe
            + " <td>" 
                + "<strong>Combate: </strong>" + data.results[i].powerstats['combat'] + "<br>"
                + "<strong>Durabilidad: </strong>" + data.results[i].powerstats['durability'] + "<br>"
                + "<strong>Inteligencia: </strong>" + data.results[i].powerstats['intelligence'] + "<br>"
                + "<strong>Poder: </strong>" + data.results[i].powerstats['power'] + "<br>"
                + "<strong>Velocidad: </strong>" + data.results[i].powerstats['speed'] + "<br>"
                + "<strong>Fuerza: </strong>" + data.results[i].powerstats['strength'] + "<br>"
            + " </td>"
            // Las ocupaciones de cada Heroe
            + " <td>" 
                
                + "<strong>Ocupación: </strong>" + data.results[i].work['occupation'] + "<br>"
            + " </td>"
            //El id que pertenece a cada heroe
            + " <td>" 
                + data.results[i].id 
            + " </td>"
            // La imagen para mejor visualizacion de cada heroe
            + " <td>"
            + "<a onclick='openModal(\"" + data.results[i].image.url + "\", \"" + data.results[i]['name'] + "\");' href='#'>"
                + "<img class='hero-img' src='" + data.results[i].image.url + "' alt='" + data.results[i]['name'] + "'>"
            + `</a>`
        + " </td>" 
        // Nombre del Personaje 
        + " <td>" + data.results[i]['name'] + " </td>"
            + "</tr>";
    }
    return data_string;

}

function setNavPages(){
    var pages = document.getElementById('nav-pages-number');
    
    var min = paginacion[0];
    var max;
    var min_aux;
    for (var i = paginacion[0]; i >= paginacion[0] - 2; i--){
        min = i;
        min_aux = i;
        if (i < 0){
            min = 0;
        }
    }
    max = paginacion[0] + 2;
    if(min_aux < 0){
        max  = max - min_aux;
    }
    if (max >= maximo_paginas){
        max = maximo_paginas;
        if (max - 4 >= 0){
            min = max - 4;
        }else if(max - 3 >= 0){
            min = max - 3;
        }
    }
    paginacion[1] = min;
    paginacion[2] = max;
    var nav_html = "";
    if (paginacion[0] === 0){
        nav_html = '<a href="#" class="isDisabled bg-primary" onclick="return false;">&laquo;</a>';
    }else{
        nav_html = '<a href="#" class="bg-primary" onclick="setPageLeft()">&laquo;</a>';
    }
    for (var i = paginacion[1]; i <= paginacion[2]; i++){
        if (paginacion[0] === i){
            nav_html = nav_html + "<a class='bg-secondary' onclick='setPage(" + i + ")' href='#'>" + i + "</a>"
        }else{
            nav_html = nav_html + "<a class='bg-primary' onclick='setPage(" + i + ")' href='#'>" + i + "</a>"
        }
    }
    if(paginacion[0] === maximo_paginas){
        nav_html = nav_html + '<a href="#" class="isDisabled bg-primary" onclick="return false;">&raquo;</a>';
    }else{
        nav_html = nav_html + '<a href="#" class="bg-primary" onclick="setPageRight()">&raquo;</a>';
    }
    pages.innerHTML = nav_html;
}

function setPage(n){
    paginacion[0] = n;
    print(data);
    return false;
}

function setPageLeft(){
    var min = paginacion[0] - 1;
    if (min <= 0){
        paginacion[0] = 0;
    }else{
        paginacion[0] = min;
    }
    print(data);
    return false;
}

function setPageRight(){
    var max = paginacion[0] + 1;
    if(max >= maximo_paginas){
        paginacion[0] = maximo_paginas;
    }else{
        paginacion[0] = max;
    }
    print(data);
    return false;
}



function openModal(img_src, alt_text){
    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    modalImg.src = img_src;
    captionText.innerHTML = alt_text;
    return false;
}

function closeModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}