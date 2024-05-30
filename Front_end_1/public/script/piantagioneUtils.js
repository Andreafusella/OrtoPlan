const currentPiantagione = JSON.parse(localStorage.getItem('currentPiantagione'));
console.log(currentPiantagione);

const n_slot = +currentPiantagione.n_slot;
const nome = currentPiantagione.nome;
const id_utente = +currentPiantagione.id_utente;
const id_pianta = +currentPiantagione.id_pianta;
const data_inizio = currentPiantagione.data_inizio;
const id_piantagione = +currentPiantagione.id_piantagione;


const confermaDeletePiantagione = document.getElementById('confermaEliminazioneModal')
const title = document.getElementById ('title');
title.textContent = nome;

async function confermaEliminazione(){
    let textDelete = `Eliminare la piantagione: ${nome}?`;
    let sceltaDelete = confirm(textDelete)
    if (sceltaDelete) {
        
        const res = await fetch('http://localhost:8000/piantagione', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_piantagione
            }),
        });

        if(res.status === 201) {
            console.log('successo');
            window.location.href = '/piantagione';
        }

    } else {

    }


}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const container2 = document.getElementById('container2');
    
    const rows = Math.ceil(n_slot / 5);

    for (let i = 0; i < rows; i++) {
        
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('flex', 'gap-10', 'w-full', 'justify-center', 'items-center', 'mb-5');

        
        const slotsInThisRow = Math.min(5, n_slot - i * 5);

        
        for (let j = 0; j < slotsInThisRow; j++) {
            const slotDiv = document.createElement('div');
            slotDiv.classList.add('bg-gray-300', 'p-6', 'rounded-2xl');

            const image = document.createElement('img');
            image.src = selectImage(arr_img, id_pianta); 
            image.alt = '';
            image.classList.add('h-20');

            slotDiv.appendChild(image);
            rowDiv.appendChild(slotDiv);
        }

        container.appendChild(rowDiv);
    }

    const imageHidden = document.createElement('img');
    imageHidden.src = selectImage(arr_img, id_pianta);
    imageHidden.classList.add('h-20');

    const h1Hidden = document.createElement('h1');
    h1Hidden.textContent = `x ${n_slot}`;
    h1Hidden.classList.add('text-5xl', 'text-black', 'font-bold');

    container2.appendChild(imageHidden);
    container2.appendChild(h1Hidden);

    //funzione per il meteo
    meteo();
    async function meteo(){
        let citta = ''
        const res = await fetch('http://localhost:8000/getCittaPiantagione', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_piantagione
            })

        });

        if (res.status == 201) {
            const data = await res.json();
            citta = data.citta;
        } else if (res.status == 404) {
            console.log('errore ricerca citta piantagione');
        }
        const apiKey = "30b35159cd1dfce6826a18b5fbbfacfc";
        const urlCurrent = `http://api.openweathermap.org/data/2.5/weather?q=${citta}&appid=${apiKey}&units=metric`;
        const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${citta}&appid=${apiKey}&units=metric`;

        try {
            const [responseCurrent, responseForecast] = await Promise.all([fetch(urlCurrent), fetch(urlForecast)]);

            if (!responseCurrent.ok) {
                throw new Error('Città non trovata');
            }
            if (!responseForecast.ok) {
                throw new Error('Previsioni non disponibili');
            }

            const oggi = await responseCurrent.json();
            const dataForecast = await responseForecast.json();

            displayWeather(oggi, dataForecast, citta);
        } catch (error) {
            console.log('error');
            console.log(error);
        }
    }
});


function selectImage(arr_img, id_pianta){
    return arr_img[id_pianta - 1];
}

const arr_img = [
    '/plants/pomodoro.png',
    '/plants/basilico.png',
    '/plants/mais.png',
    '/plants/lattuga.png',
    '/plants/carota.png',
    '/plants/melanzana.png',
    '/plants/peperone.png',
    '/plants/fagiolo.png',
    '/plants/limone.png',
    '/plants/arancia.png',
];

//set a displat le previsioni
function displayWeather(oggi, dataForecast, citta) {

    // Previsioni per domani e dopodomani
    const forecast = dataForecast.list;
    const now = new Date();
    const tomorrow = new Date(now);
    const dayAfterTomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    dayAfterTomorrow.setDate(now.getDate() + 2);

    const domani = forecast.find(f => new Date(f.dt_txt).getDate() === tomorrow.getDate());
    const dopodomani = forecast.find(f => new Date(f.dt_txt).getDate() === dayAfterTomorrow.getDate());

    const meteo1 = document.getElementById('imgMeteo1');
    const textMeteo1 = document.getElementById('textMeteo1');
    const meteo2 = document.getElementById('imgMeteo2');
    const textMeteo2 = document.getElementById('textMeteo2');
    const meteo3 = document.getElementById('imgMeteo3');
    const textMeteo3 = document.getElementById('textMeteo3');
    const h1citta = document.getElementById('citta');
    h1citta.textContent = citta;

    const img1 = document.createElement('img');
    const h1 = document.createElement('h1');
    const temp1 = document.createElement('h1');
    
    const img2 = document.createElement('img');
    const h2 = document.createElement('h1');
    const temp2 = document.createElement('h1');
    
    const img3 = document.createElement('img');
    const h3 = document.createElement('h1');
    const temp3 = document.createElement('h1');
    
    h1.classList.add('text-black', 'font-bold', 'text-lg');
    temp1.classList.add('text-black', 'font-bold', 'text-lg');
    img1.classList.add('h-10');
    
    h2.classList.add('text-black', 'font-bold', 'text-lg');
    temp2.classList.add('text-black', 'font-bold', 'text-lg');
    img2.classList.add('h-10');
    
    h3.classList.add('text-black', 'font-bold', 'text-lg');
    temp3.classList.add('text-black', 'font-bold', 'text-lg');
    img3.classList.add('h-10');

    //set meteo oggi
    if (oggi.weather[0].main == 'Clear') {
        img1.src = '/meteo/sole.png';
        h1.textContent = 'Soleggiato';
        temp1.textContent = `Temperatura: ${oggi.main.temp} C°`;

    } else if (oggi.weather[0].main == 'Clouds') {
        img1.src = '/meteo/nuvole.png';
        h1.textContent = 'Nuvoloso';
        temp1.textContent = `Temperatura: ${oggi.main.temp} C°`;

    }else if (oggi.weather[0].main == 'Rain'){
        img1.src = '/meteo/pioggia.png';
        h1.textContent = 'Pioggia';
        temp1.textContent = `Temperatura: ${oggi.main.temp} C°`;
    } else {
        h1.textContent = 'Meteo attualmente non disponibile';
    }

    //set meteo domani
    if (domani.weather[0].main == 'Clear') {
        img2.src = '/meteo/sole.png';
        h2.textContent = 'Soleggiato';
        temp2.textContent = `Temperatura: ${domani.main.temp} C°`;

    } else if (domani.weather[0].main == 'Clouds') {
        img2.src = '/meteo/nuvole.png';
        h2.textContent = 'Nuvoloso';
        temp2.textContent = `Temperatura: ${domani.main.temp} C°`;

    }else if (domani.weather[0].main == 'Rain'){
        img2.src = '/meteo/pioggia.png';
        h2.textContent = 'Pioggia';
        temp2.textContent = `Temperatura: ${domani.main.temp} C°`;
    } else {
        h2.textContent = 'Meteo attualmente non disponibile';
    }

    //set meteo dopodomani
    if (dopodomani.weather[0].main == 'Clear') {
        img3.src = '/meteo/sole.png';
        h3.textContent = 'Soleggiato';
        temp3.textContent = `Temperatura: ${dopodomani.main.temp} C°`;

    } else if (dopodomani.weather[0].main == 'Clouds') {
        img3.src = '/meteo/nuvole.png';
        h3.textContent = 'Nuvoloso';
        temp3.textContent = `Temperatura: ${dopodomani.main.temp} C°`;

    }else if (dopodomani.weather[0].main == 'Rain'){
        img3.src = '/meteo/pioggia.png';
        h3.textContent = 'Pioggia';
        temp3.textContent = `Temperatura: ${dopodomani.main.temp} C°`;
    } else {
        h3.textContent = 'Meteo attualmente non disponibile';
    }

    meteo1.appendChild(img1);
    textMeteo1.appendChild(h1);
    textMeteo1.appendChild(temp1);

    meteo2.appendChild(img2);
    textMeteo2.appendChild(h2);
    textMeteo2.appendChild(temp2);

    meteo3.appendChild(img3);
    textMeteo3.appendChild(h3);
    textMeteo3.appendChild(temp3);

}
