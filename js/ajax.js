//const { isEmptyObject } = require("jquery");

var current_page = [0, 0, 4];
var data;
const DIV = 2;
var max_pages;
//document.querySelector('#get_memes').addEventListener('click', function(){
  //  obtenerDatos('get_memes');
//});


/**document.querySelector('#caption_image').addEventListener('click', function(){
    obtenerDatos('caption_image');
});
*/

function hideNotice(){
    document.getElementById("main_notice").classList.add("e_hidden");
}

function showNotice(notice, notice_type){
    document.getElementById("main_notice").classList = '';
    document.getElementById("main_notice").classList.add("notice_container");
    document.getElementById("main_notice").classList.add("notice_type");
    document.getElementById("notice").innerHTML = "<span>"+notice+"</span>";

}

function getXMLRequest(url){
    if (window.XMLHttpRequest){
        api = new XMLHttpRequest();

    }else{
        api = new ActiveXObject("Microsoft.XMLHTTP")
    }
    api.open('GET',url,true);
    api.responseText='json';
    api.onreadystatechange = function(){
        if ( this.status == 200 &&this.readyState == 4 ){
            data = api.response;
            current_page = [0,0,4];
            hiddeLoading();
            print(data);
            console.log(data);
        }
    };
    showLoading();
    api.send();
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

function  searchMemes(){
    hideNotice();
    var memesN = document.getElementById("search-memes-input").nodeValue;
    if (!isEmpty(memesN,"Ingrese el id")){
        getXMLRequest("https://superheroapi.com/api/3275332375923204/search/"+memes);
    }
}

//Imprimir

function print(){
    console.log(data);
    var tabla = document.getElementById("memes-tabla");
    var data_head = `<thead class = "thead-dark">
    <tr>
        <th></th>
        <th>ID</th>
        <th>Nombre</th>
        <th>Imagen_URL</th>
        <th>Ancho</th>
        <th>Altura</th>
        <th>Recuento_cajas</th>
    </tr>   
    </thead>
    <tbody>`;
    var memes = "";
    if (data.response === "error"){
        showNotice("No existe registros." , "bg-warning");
        clearNav();
    }else{
        max_pages = Math.trunc((data.results.length - 1 )/DIV);
        var min = current_page[0]*DIV;
        var max = min + (DIV-1);
        if (max >= data.results.length){
            max = data.results.length-1;
        }
        setNavPages();
        memes = getMemes(data,min,max);
    }
    table.innerHTML = data_head + memes + "</tbody>";
}

function getMemes(data,min,max){
    var data_string = "";
    for(var i = min; i <= max; i++){
        data_string = data_string + "<tr>"
            + " <td>"
                + "<a onclick='openModal(\"" + data.results[i].image.url + "\", \"" + data.results[i]['name'] + "\");' href='#'>"
                    + "<img class='hero-img' src='" + data.results[i].image.url + "' alt='" + data.results[i]['name'] + "'>"
                + `</a>`
            + " </td>" 
            + " <td>" + data.results[i]['name'] + " </td>" 
            + " <td>" 
                + "<strong>Género: </strong>" + data.results[i].appearance.gender + "<br>"
                + "<strong>Raza: </strong>" + data.results[i].appearance.race + "<br>"
                + "<strong>Altura: </strong>" + data.results[i].appearance.height['1'] + "<br>"
                + "<strong>Peso: </strong>" + data.results[i].appearance.weight['0'] + "<br>" 
            + " </td>"
            + " <td>" 
                + "<strong>Nombre Completo: </strong>" + data.results[i].biography['full-name'] + "<br>"
                + "<strong>Primera aparición: </strong>" + data.results[i].biography['first-appearance'] + "<br>"
                + "<strong>Lugar de nacimiento: </strong>" + data.results[i].biography['place-of-birth'] + "<br>"
                + "<strong>Publicador: </strong>" + data.results[i].biography['publisher'] + "<br>"
            + " </td>"
            + " <td>" 
                + "<strong>Grupo/Afiliación: </strong>" + data.results[i].connections['group-affiliation'] + "<br>"
                
            + " </td>"
            + " <td>" 
                + "<strong>Combate: </strong>" + data.results[i].powerstats['combat'] + "<br>"
                + "<strong>Durabilidad: </strong>" + data.results[i].powerstats['durability'] + "<br>"
                + "<strong>Inteligencia: </strong>" + data.results[i].powerstats['intelligence'] + "<br>"
                + "<strong>Poder: </strong>" + data.results[i].powerstats['power'] + "<br>"
                + "<strong>Velocidad: </strong>" + data.results[i].powerstats['speed'] + "<br>"
                + "<strong>Fuerza: </strong>" + data.results[i].powerstats['strength'] + "<br>"
            + " </td>"
            + " <td>" 
                + "<strong>Base: </strong>" + data.results[i].work['base'] + "<br>"
                + "<strong>Ocupación: </strong>" + data.results[i].work['occupation'] + "<br>"
            + " </td>"
            + " <td>" 
                + data.results[i].id 
            + " </td>"
            
            + "</tr>";
    }
    return data_string;

}

function setNavPages(){
    var pages = document.getElementById('nav-pages-numbers');
    
    var min = current_page[0];
    var max;
    var min_aux;
    for (var i = current_page[0]; i >= current_page[0] - 2; i--){
        min = i;
        min_aux = i;
        if (i < 0){
            min = 0;
        }
    }
    max = current_page[0] + 2;
    if(min_aux < 0){
        max  = max - min_aux;
    }
    if (max >= max_pages){
        max = max_pages;
        if (max - 4 >= 0){
            min = max - 4;
        }else if(max - 3 >= 0){
            min = max - 3;
        }
    }
    current_page[1] = min;
    current_page[2] = max;
    var nav_html = "";
    if (current_page[0] === 0){
        nav_html = '<a href="#" class="isDisabled bg-primary" onclick="return false;">&laquo;</a>';
    }else{
        nav_html = '<a href="#" class="bg-primary" onclick="setPageLeft()">&laquo;</a>';
    }
    for (var i = current_page[1]; i <= current_page[2]; i++){
        if (current_page[0] === i){
            nav_html = nav_html + "<a class='bg-secondary' onclick='setPage(" + i + ")' href='#'>" + i + "</a>"
        }else{
            nav_html = nav_html + "<a class='bg-primary' onclick='setPage(" + i + ")' href='#'>" + i + "</a>"
        }
    }
    if(current_page[0] === max_pages){
        nav_html = nav_html + '<a href="#" class="isDisabled bg-primary" onclick="return false;">&raquo;</a>';
    }else{
        nav_html = nav_html + '<a href="#" class="bg-primary" onclick="setPageRight()">&raquo;</a>';
    }
    pages.innerHTML = nav_html;
}

function setPage(n){
    current_page[0] = n;
    print(data);
    return false;
}

function setPageLeft(){
    var min = current_page[0] - 1;
    if (min <= 0){
        current_page[0] = 0;
    }else{
        current_page[0] = min;
    }
    print(data);
    return false;
}

function setPageRight(){
    var max = current_page[0] + 1;
    if(max >= max_pages){
        current_page[0] = max_pages;
    }else{
        current_page[0] = max;
    }
    print(data);
    return false;
}

function showLoading(){
    centerLoading();
    document.getElementById("loading").classList.remove("e_hidden");
    document.getElementById("background").classList.remove("e_hidden");
}

function hiddeLoading(){
    document.getElementById("loading").classList.add("e_hidden");
    document.getElementById("background").classList.add("e_hidden");
}

function centerLoading(){
    var loading = document.getElementById("loading");
    var w = window.innerWidth;
    var h = window.innerHeight;

    loading.style.left = ((w/2) - 40) + "px";
    loading.style.top = ((h/2) - 40) + "px";
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