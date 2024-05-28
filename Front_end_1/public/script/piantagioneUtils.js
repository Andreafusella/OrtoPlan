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

});

async function annaffia(){
    let textDAnnaffia = `Annaffiare la piantagione: ${nome}?`;
    let confirmAnnaffia = confirm(textDAnnaffia)

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let date_save = new Date(year, month, day);

    if (confirmAnnaffia) {
        try {
            const res = await fetch('http://localhost:8000/getTimePianta',{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_pianta
                }), 
            });
            const data = await res.json();
            const t_acqua = data.t_acqua;

            const res2 = await fetch('http://localhost:8000/annaffiare',{
                //FARE QUESTO
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_piantagione,
                    date_save,
                    t_acqua,
                    id_utente,

                }),
            });
            const data2 = await res2.json();

        } catch(error) {
            console.log(error);
            console.log('errore annaffiare la piantagione');
        }
    }
}

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

