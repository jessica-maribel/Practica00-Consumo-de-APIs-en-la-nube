//document.querySelector('#get_memes').addEventListener('click', function(){
  //  obtenerDatos('get_memes');
//});

document.querySelector('#caption_image').addEventListener('click', function(){
    obtenerDatos('caption_image');
});

function obtenerDatos(valor){
    console.log('HIZO CLICK');
    let url = 'https://api.imgflip.com/get_memes';

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
