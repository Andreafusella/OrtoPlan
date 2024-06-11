const currentPiantagione = JSON.parse(localStorage.getItem('currentPiantagione'));
const n_slot = +currentPiantagione.n_slot;
const nome = currentPiantagione.nome;
const id_utente = +currentPiantagione.id_utente;
const id_pianta = +currentPiantagione.id_pianta;
const data_inizio = currentPiantagione.data_inizio;
const id_piantagione = +currentPiantagione.id_piantagione;


const confermaDeletePiantagione = document.getElementById('confermaEliminazioneModal');
const title = document.getElementById ('title');
title.textContent = nome;

//funzione per eliminare la piantagione
async function confermaEliminazione(){
    let textDelete = `Eliminare la piantagione: ${nome}?`;
    let sceltaDelete = confirm(textDelete);
    if (sceltaDelete) {
        
        const res = await fetch('http://localhost:8000/piantagione', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_piantagione,
            }),
        });

        if(res.status === 201) {
            console.log('successo');
            window.location.href = '/piantagione';
        }

    } else {

    }


}

document.addEventListener('DOMContentLoaded', async() => {
    
    //funzione per la selezione delle immagini
    function selectImage(arr_img, id_pianta){
        return arr_img[id_pianta - 1];
    }
    
    const arr_desc = [
        "Il pomodoro (Solanum lycopersicum) è una pianta della famiglia delle Solanaceae,originaria dell'America centrale e meridionale. Coltivato in tutto il mondo, è noto per i suoi frutti rossi, succosi e nutrienti, ricchi di vitamine A e C.",
        "Il basilico è una pianta aromatica dal profumo intenso e fresco, ampiamente utilizzata in cucina mediterranea. Apprezzato per il suo sapore unico, il basilico è un ingrediente fondamentale in piatti come il pesto e la caprese.",
        "Il mais è un cereale originario dell'America centrale e meridionale, noto per le sue spighe gialle caratteristiche. È una fonte importante di carboidrati, fibre, vitamine e minerali, ed è utilizzato in molte cucine del mondo per preparare piatti come tortillas, polenta, popcorn e insalate. Grazie alla sua versatilità e al suo valore nutrizionale, il mais è un alimento ampiamente coltivato e consumato in tutto il mondo.",
        "La lattuga è una verdura a foglia verde, croccante e dal sapore delicato, comunemente utilizzata nelle insalate e come guarnizione in molti piatti. È ricca di acqua, vitamine, minerali e fibre, rendendola un'opzione salutare per arricchire la dieta quotidiana.",
        "Le carote sono radici commestibili di colore arancione brillante, ricche di beta-carotene, vitamine e antiossidanti. Spesso consumate crude come snack o in insalate, le carote possono anche essere cotte, grigliate o usate come ingrediente in una varietà di piatti, dai sughi alle zuppe. La loro dolcezza naturale le rende popolari sia tra adulti che bambini, mentre il loro contenuto di fibre e nutrienti le rende un'aggiunta nutriente a una dieta equilibrata.",
        "Le melanzane sono ortaggi apprezzati per la loro versatilità in cucina, essendo protagoniste di ricette come la parmigiana o le melanzane ripiene. Di colore viola scuro, sono ricche di fibre e antiossidanti, contribuendo così a una dieta equilibrata e salutare.",
        "I peperoni, ortaggi dal gusto succulento e versatile, crescono meglio in climi caldi e terreni ben drenati. Disponibili in una varietà di colori e sapori, dalla dolcezza del rosso al pizzico del verde, arricchiscono piatti e insalate con il loro vibrante aroma e colore. Coltivare peperoni può essere gratificante, offrendo una varietà di opzioni culinarie in cucina.",
        "I fagioli, preziosi legumi ricchi di proteine e fibre, prosperano in terreni ben drenati e soleggiati. Con una vasta gamma di varietà, dai fagioli neri ai cannellini, offrono versatilità in cucina, arricchendo zuppe, insalate e piatti principali. La coltivazione dei fagioli può essere gratificante, offrendo un'abbondante raccolta di legumi nutrienti per una cucina sana e deliziosa.",
        "I limoni, dai loro alberi sempreverdi e rigogliosi, regalano un'esplosione di freschezza e vitalità. Le loro brillanti sfumature gialle illuminano gli orti e i giardini, mentre i loro frutti succosi e profumati aggiungono un tocco di acidità e vivacità a piatti dolci e salati. Coltivare limoni richiede cure amorevoli e pazienza, ma le ricompense sono frutti deliziosi e una fragranza che pervade l'aria, donando gioia e gusto alla vita quotidiana.",
        "Le arance, frutti iconici degli agrumeti, si distinguono per il loro colore brillante e il sapore succoso e dolce. Le piante di arancio, con le loro foglie verde scuro e i fiori profumati, aggiungono bellezza e vitalità al paesaggio. Coltivarle richiede un clima caldo e ben drenato, ma la ricompensa è un raccolto di frutti deliziosi, ricchi di vitamina C e perfetti per spremute fresche o gustosi dessert.",
    ]

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

    const currentPiantagione = JSON.parse(localStorage.getItem('currentPiantagione'));

    const img_quantitaCell = document.getElementById('img_quantita');
    const imgOrtaggio = document.createElement('img');
    const quantita = document.createElement('h1');
    const acquaCell = document.getElementById('annaffiatoio');
    const raccoltaCell = document.getElementById('raccolta');
    const imgDescription = document.getElementById('imgDescription');
    const descrizionePianta = document.getElementById('descrizionePianta');

    const calorie = document.getElementById('calorie');
    const grassi = document.getElementById('grassi');
    const carboidrati = document.getElementById('carboidrati');
    const potassio = document.getElementById('potassio');
    const proteine = document.getElementById('proteine');
    const vitamine = document.getElementById('vitamine');

    const id_pianta = +currentPiantagione.id_pianta;

    acquaCell.textContent = +currentPiantagione.t_acqua;
    raccoltaCell.textContent = +currentPiantagione.t_raccolta;

    if (+currentPiantagione.t_acqua >= 2) {
        acquaCell.classList.add('text-cyan-600');
    }else if (+currentPiantagione.t_acqua < 2) {
        acquaCell.classList.add('text-orange-400');
    }
    
    if(+currentPiantagione.t_raccolta >= 5) {
        raccoltaCell.classList.add('text-cyan-600');
    } else if (+currentPiantagione.t_raccolta < 5) {
        raccoltaCell.classList.add('text-orange-400');
    }


    quantita.classList.add('text-black', 'font-bold', 'text-3xl');
    imgOrtaggio.classList.add('h-24')

    imgOrtaggio.src = selectImage(arr_img, id_pianta);
    quantita.textContent = `X ${n_slot}`;

    img_quantitaCell.appendChild(imgOrtaggio);
    img_quantitaCell.appendChild(quantita);

    const img = document.createElement('img');
    imgDescription.src = selectImage(arr_img, id_pianta)
    imgDescription.classList.add('h-72');

    descrizionePianta.textContent = arr_desc[id_pianta - 1];


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

    try {

        const res = await fetch(`http://localhost:8000/getValoriNutrizionali?id_pianta=${id_pianta}`, {
        method: 'GET',
        });

        if (res.status == 201) {
            const data = await res.json();

            calorie.textContent = data.calorie;
            grassi.textContent = data.grassi;
            carboidrati.textContent = data.carboidrati;
            potassio.textContent = data.potassio;
            proteine.textContent = data.proteine;
            vitamine.textContent = data.vitamine;

        }

    } catch(error) {
        console.log(error);
        console.log('errore ricerca valori nutrizionali');
    }
    
});


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
    h1citta.textContent = `📍${citta}`;

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

    }else if (oggi.weather[0].main == 'Rain') {
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

    }else if (domani.weather[0].main == 'Rain') {
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

    }else if (dopodomani.weather[0].main == 'Rain') {
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

function selectImage(arr_img, id_pianta) {
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
