const api = axios.create({

    baseURL: 'https://api.thecatapi.com/v1/'

});

api.defaults.headers.common['X-API-KEY'] = 'live_kq5o2ClAUGKdisUdEeGVI2RItEfMbbMS2AFWyezOXTye8TWgRO3bRGnh7JSrVDyD';

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const spanError = document.getElementById('error');

async function loadRandomMichis(){

    let contenedor_fotos = document.getElementById('contenedor_imagenes_aleatorias');
    contenedor_fotos.innerHTML = "";

    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();

    console.log('Random: ');
    console.log(data);  

    if(response.status !==200){

        spanError.innerHTML = 'Hubo un error' + response.status;

    } else {

        for( let i = 0 ; i < 6; i++ ){

            let innerDiv = document.createElement('div');
            innerDiv.className = 'container';
    
            let image = document.createElement('img');
            image.className = 'w-60 h-60 image';
            image.src = data[i].url;
    
            let button = document.createElement('button');
            let buttonText = document.createTextNode('Guardar en favoritos');
            button.appendChild(buttonText);
            button.className = 'w-full h-12 text-center bg-green-500 my-2 button_random rounded-md font-semibold';
            button.onclick = () => saveFavoriteMichi(data[i].id);

            innerDiv.appendChild(image);   
            innerDiv.appendChild(button);   
            contenedor_fotos.appendChild(innerDiv);
    
        }

    // const img1 = document.getElementById('img1');
    // const img2 = document.getElementById('img2');
    // const btn1 = document.getElementById('btn1');
    // const btn2 = document.getElementById('btn2');
    
    // img1.src = data[0].url; 
    // img2.src = data[1].url; 

    // btn1.onclick = () => saveFavoriteMichi(data[0].id);
    // btn2.onclick = () => saveFavoriteMichi(data[1].id);

    }    

}

async function loadFavouriteMichis(){

    const res = await fetch(API_URL_FAVOURITES,
        {

           method: 'GET',
           headers:{

            'X-API-KEY': 'live_kq5o2ClAUGKdisUdEeGVI2RItEfMbbMS2AFWyezOXTye8TWgRO3bRGnh7JSrVDyD'

           } 

        });
    const data = await res.json();
    console.log('Favoritos: ');
    console.log(data); 

    if(res.status !== 200){

        spanError.innerHTML= "Hubo un error: " + res.status + data.message;

    } else {

        const section = document.getElementById('favoriteMichis')
        section.innerHTML = "";

        data.forEach(michi => {
            
            // const article = document.createElement('article');
            // const img = document.createElement('img');
            // const btn = document.createElement('button');
            // const btnText = document.createTextNode('Sacar al michi de favoritos');

            // img.src = michi.image.url;
            // img.width = 150;
            // img.height = 150;
            // btn.appendChild(btnText);
            // btn.onclick = () => deleteFavoriteMichi(michi.id);
            // article.appendChild(img);
            // article.appendChild(btn);
            // section.appendChild(article);

            let innerDiv = document.createElement('div');
            innerDiv.className = 'container';
    
            let image = document.createElement('img');
            image.className = 'w-60 h-60 image';
            image.src = michi.image.url;
    
            let button = document.createElement('button');
            let buttonText = document.createTextNode('Sacar al michi de favoritos');
            button.appendChild(buttonText);
            button.className = 'w-full h-12 text-center bg-red-500 my-2 button_random rounded-md font-semibold';
            button.onclick = () => deleteFavoriteMichi(michi.id);

            innerDiv.appendChild(image);   
            innerDiv.appendChild(button);   
            section.appendChild(innerDiv);

        });

    }

}

async function saveFavoriteMichi(id){

    // const response = await fetch(API_URL_FAVOURITES, {

    //     method: 'POST',
    //     headers: {

    //         'Content-Type': 'application/json',
    //         'X-API-KEY': 'live_kq5o2ClAUGKdisUdEeGVI2RItEfMbbMS2AFWyezOXTye8TWgRO3bRGnh7JSrVDyD'

    //     },
    //     body: JSON.stringify({image_id:id}),
    // });

    const {data, status} = await api.post('/favourites',{

            image_id: id

        });

    console.log("save:",data);

    if(status !== 200){

        spanError.innerHTML='Hubo un error' + response.status + data.message;

    } else {

        console.log('Michi guardado en favoritos: ', data);
        loadFavouriteMichis();

    }

}

async function deleteFavoriteMichi(id){

    const response = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
        headers:{

            'X-API-KEY': 'live_kq5o2ClAUGKdisUdEeGVI2RItEfMbbMS2AFWyezOXTye8TWgRO3bRGnh7JSrVDyD'

           } 
    });

    const data = await response.json();


    if(response.status !== 200){

        spanError.innerHTML='Hubo un error' + response.status + data.message;

    } else {

        console.log("Michi eliminado de favoritos:",data);
        loadFavouriteMichis();

    }


}

async function uploadMichoPhoto(){

    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const response = await fetch(API_URL_UPLOAD, {

        method: 'POST',
        headers:{

            // 'Content-Type': 'multipart/formdata',
            'X-API-KEY': 'live_kq5o2ClAUGKdisUdEeGVI2RItEfMbbMS2AFWyezOXTye8TWgRO3bRGnh7JSrVDyD'

        },
        body: formData,
    });

    const data = await response.json();


    if(response.status !== 201){

        spanError.innerHTML='Hubo un error al subir michi' + response.status + data.message;

    } else {

        console.log("Foto de Michi subida :D",data);
        console.log({ data });
        console.log(data.url);
        saveFavoriteMichi(data.id)

    }

}

loadRandomMichis();
loadFavouriteMichis();