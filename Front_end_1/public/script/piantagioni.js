

const piantagioneModal = document.getElementById('piantagione');
const piantagioneForm = document.getElementById('piantagioneForm');
const inputNome = document.getElementById('inputNome');
const inputNumeroPianta = document.getElementById('inputNumeroPiante');
const inputPianta = document.getElementById('inputPianta');
const p = document.getElementById('errorMessage');

const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

let finalDate = new Date(year, month, day);

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
function openModalPiantagione() {
    piantagioneModal.showModal();
    piantagioneForm.reset();
    AllPlants();
    inputNome.classList.remove('input-error');
    inputNumeroPianta.classList.remove('input-error');
    inputPianta.classList.remove('input-error');
    if (p) {
        p.remove();
    }
}

piantagioneForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelectorAll(".error-message").forEach((element) => {
        element.remove();
    });
    document.querySelectorAll(".input-error").forEach((element) => {
        element.classList.remove("input-error");
    });

    const nome = e.target.nome.value;
    const numeroPiante = e.target.numeroPiante.value;
    const pianta = e.target.pianta.value;
    console.log(pianta);
    const validation = validate({
        nome,
        numeroPiante,
        pianta,
    }, {
        nome: {
            presence: { allowEmpty: false },
        },
        numeroPiante: {
            presence: { allowEmpty: false },
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 1,
                lessThanOrEqualTo: 25,
                message: "Il numero di piante deve essere compreso tra 1 e 25"
            }
        },
    });

    if (validation) {
        checkValidation(validation);
        return;
    }

    const utente = JSON.parse(localStorage.getItem('utente'));
    const id_utente = utente.utente.id_utente;
    console.log(id_utente);
    const res = await fetch('http://localhost:8000/addPiantagione', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            nome,
            numeroPiante,
            pianta,
            date: finalDate.toISOString(),
            id_utente,
        })

    });

    if (res.ok) {
        console.log('Piantagione aggiunta con successo');
        location.reload();
        piantagioneModal.close();
    } else {
        console.log("Errore durante l'aggiunta della piantagione");
    }
});


function knowAcqua(piante, piantagioni) {
    const id_pianta = piantagioni.id_pianta;

    const piantaCorrispondente = piante.find(pianta => pianta.id_pianta === id_pianta);

    if (piantaCorrispondente) {
        const t_acqua = piantaCorrispondente.t_acqua;
        // console.log('Il valore di t_acqua per la pianta è:', t_acqua);
        return t_acqua;
    } else {
        console.log('Pianta non trovata');
        return null;
    }
}

function knowRaccolta(piante, piantagioni) {
    const id_pianta = piantagioni.id_pianta;

    // Trova la pianta corrispondente
    const piantaCorrispondente = piante.find(pianta => pianta.id_pianta === id_pianta);
    if (piantaCorrispondente) {
        let t_raccolta = piantaCorrispondente.t_raccolta;
        let inizio_data = new Date();
        let fine_data = new Date(inizio_data);
        fine_data.setDate(inizio_data.getDate() + t_raccolta);

        function calcolaTempoRimanente() {
            let giorno_corrente = new Date();
            let differenza_tempo = fine_data.getTime() - giorno_corrente.getTime(); 
            tempo_rimanente = Math.ceil(differenza_tempo / (1000 * 3600 * 24));
            return tempo_rimanente
        }
        let tempo_finale =calcolaTempoRimanente();
        
        return tempo_finale;
    } else {
        console.log('Pianta non trovata');
        return null;
    }
}




async function AllPlants() {
    const res = await fetch('http://localhost:8000/piantagioni', {
        method: 'GET',
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data);

        const inputPianta = document.getElementById('inputPianta');
        inputPianta.innerHTML = '';

        data.forEach((pianta) => {
            const option = document.createElement('option');
            option.value = pianta.nome;
            option.textContent = pianta.nome;
            inputPianta.appendChild(option);
        });
    } else {
        console.log('Errore nella richiesta:', res.status);
    }
}




document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('piantagioni-container');

    async function fetchPiantagioni() {
        try {
            const res = await fetch('http://localhost:8000/piantagione', {
                method: 'GET',
            });

            if (res.ok) {
                const data = await res.json();
                const piante = data.piante;
                const piantagioni = data.piantagioni;

                // Recupera l'ID utente dal localStorage
                const utente = JSON.parse(localStorage.getItem('utente'));
                const id_utente = utente.utente.id_utente;

                // Filtra le piantagioni per l'ID utente
                const piantagioniUtente = piantagioni.filter(piantagione => piantagione.id_utente === id_utente);

                piantagioniUtente.forEach((piantagione, index) => {
                    const piantagioneDiv = document.createElement('div');
                    piantagioneDiv.classList.add('bg-gray-300', 'p-4', 'rounded-2xl', 'flex', 'flex-col', 'justify-center', 'items-center', 'shadow-2xl');

                    const title = document.createElement('h1');
                    title.classList.add('text-white', 'text-2xl', 'font-bold', 'text-center', 'mb-4');
                    title.textContent = piantagione.nome;
                    piantagioneDiv.appendChild(title);

                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('flex', 'gap-1', 'justify-center', 'items-center');
                    const image = document.createElement('img');
                    image.src = selectImage(arr_img, piantagione.id_pianta);
                    image.classList.add('h-24', 'mb-4');
                    const numeroPiante = document.createElement('h1');
                    numeroPiante.classList.add('text-black', 'text-4xl', 'font-bold');
                    numeroPiante.textContent = piantagione.numero_piante;
                    imageContainer.appendChild(image);
                    imageContainer.appendChild(numeroPiante);
                    piantagioneDiv.appendChild(imageContainer);

                    const infoContainer = document.createElement('div');
                    infoContainer.classList.add('mb-6');
                    const annaffiatoioContainer = document.createElement('div');
                    annaffiatoioContainer.classList.add('flex', 'items-center', 'gap-3');
                    const annaffiatoioImage = document.createElement('img');
                    annaffiatoioImage.src = '/assets/annaffiatoio.png';
                    annaffiatoioImage.classList.add('h-12');

                    const annaffiatoioText = document.createElement('h1');
                    const raccoltaAcqua = knowAcqua(piante, piantagione); // finireeeee
                    annaffiatoioText.textContent = `tra ${raccoltaAcqua} giorni`;
                    annaffiatoioText.classList.add('text-lg', 'font-bold');

                    if (raccoltaAcqua < 2) {
                        annaffiatoioText.classList.add('text-orange-400');
                        annaffiatoioText.classList.remove('text-cyan-600');
                    } else if (raccoltaAcqua >= 2) {
                        annaffiatoioText.classList.add('text-cyan-600');
                        annaffiatoioText.classList.remove('text-orange-400');
                    }

                    annaffiatoioContainer.appendChild(annaffiatoioImage);
                    annaffiatoioContainer.appendChild(annaffiatoioText);
                    const raccoltaContainer = document.createElement('div');
                    raccoltaContainer.classList.add('flex', 'items-center', 'gap-3');
                    const raccoltaImage = document.createElement('img');
                    raccoltaImage.src = '/assets/raccolta.png';
                    raccoltaImage.classList.add('h-10');

                    const raccoltaText = document.createElement('h1');
                    const giorniRimanenti = knowRaccolta(piante, piantagione); // finireeee
                    raccoltaText.textContent = `tra ${giorniRimanenti} giorni`;
                    raccoltaText.classList.add('text-lg', 'font-bold');

                    if (giorniRimanenti >= 5 && giorniRimanenti <= 14) {
                        raccoltaText.classList.add('text-orange-400');
                        raccoltaText.classList.remove('text-red-600');
                        raccoltaText.classList.remove('text-cyan-600');
                    } else if (giorniRimanenti <= 4) {
                        raccoltaText.classList.add('text-red-600');
                        raccoltaText.classList.remove('text-orange-400');
                        raccoltaText.classList.remove('text-cyan-600');
                    } else if (giorniRimanenti >= 15) {
                        raccoltaText.classList.add('text-cyan-600');
                        raccoltaText.classList.remove('text-red-600');
                        raccoltaText.classList.remove('text-orange-400');
                    }

                    raccoltaContainer.appendChild(raccoltaImage);
                    raccoltaContainer.appendChild(raccoltaText);
                    infoContainer.appendChild(annaffiatoioContainer);
                    infoContainer.appendChild(raccoltaContainer);
                    piantagioneDiv.appendChild(infoContainer);

                    const button = document.createElement('button');
                    button.textContent = 'Entra';
                    button.classList.add('btn', 'btn-primary', 'text-white', 'w-[100px]');
                    button.onclick = function() {
                        localStorage.setItem('currentPiantagione', JSON.stringify({
                            id_piantagione: piantagione.id_piantagione,
                            n_slot: piantagione.n_slot,
                            id_utente: piantagione.id_utente,
                            id_pianta: piantagione.id_pianta,
                            data_inizio: piantagione.data_inizio,
                            nome: piantagione.nome
                        }));

                        let storedpiantagione = JSON.parse(localStorage.getItem('currentPiantagione'));
                        console.log(storedpiantagione);

                        window.location.href = '/enterPiantagioni';
                    };
                    piantagioneDiv.appendChild(button);

                    container.appendChild(piantagioneDiv);
                });
            } else {
                console.error('Errore durante il recupero delle piantagioni:', res.status);
            }
        } catch (error) {
            console.error('Errore durante il recupero delle piantagioni:', error);
        }
    }

    fetchPiantagioni();
});




function checkValidation(validation) {
    Object.keys(validation).forEach((key) => {
        const el = document.querySelector(`[name=${key}]`);
        if (el) {
            setErr(el, validation[key]);
        }
    });
}

function setErr(e, messages) {
    e.classList.add("input-error");
    messages.reverse().forEach((message) => {
        const p = document.createElement("p");
        p.textContent = message;
        p.classList.add("text-red-500", "error-message");
        p.id = 'errorMessage';
        e.parentNode.insertBefore(p, e.nextSibling);
    });
}







