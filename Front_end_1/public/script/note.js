
document.addEventListener('DOMContentLoaded', async () => {
    const utente = JSON.parse(localStorage.getItem('utente'));

    try {
        const res = await fetch(`http://localhost:8000/firstNota?id_utente=${utente.id_utente}`, {
            method: 'GET',
        });
        
        const note = await res.json();
        if (note.length == 0) {
            const firstNota = document.getElementById('firstNota');
            firstNota.classList.remove('hidden');
        } else {
            document.getElementById('tabella').classList.remove('hidden');

            const tbody = document.getElementById('noteTbody');
            
            note.forEach((nota, index) => {
                const row = document.createElement('tr');
    
                // Crea le celle
                
                const titleCell = document.createElement('td');
                titleCell.textContent = nota.titolo;
    
                const dateCell = document.createElement('td');
                const date = new Date(nota.data_creazione);
                dateCell.textContent = date.toLocaleDateString();
    
                const actionCell = document.createElement('td');
                const actionButton = document.createElement('button');
                actionButton.textContent = '🔎';
                actionButton.classList.add('text-4xl');
                actionButton.onclick = () => openModal(nota.titolo, nota.testo);
                actionCell.appendChild(actionButton);
    
                
                row.appendChild(titleCell);
                row.appendChild(dateCell);
                row.appendChild(actionCell);
    
                
                tbody.appendChild(row);
            });
    
            // Rendi visibile la tabella
            document.getElementById('tabella').classList.remove('hidden');
        }
    
        function openModal(titolo, testo) {
            const titoloElement = document.getElementById('titolo');
            titoloElement.textContent = titolo;
            titoloElement.classList.add('font-bold');

            const testoElement = document.getElementById('notaText');
            testoElement.textContent = testo;
            testoElement.classList.add('border-[3px]', 'border-green-500', 'rounded-2xl', 'p-3', 'text-center');
            
            document.getElementById('notaModal').showModal();
        }
    } catch(error) {
        console.log(error);
    }

});

const inputContenuto = document.getElementById("inputContenuto");
const lunghezza = document.getElementById("lunghezza");

inputContenuto.addEventListener("input", function() {
    const testo = inputContenuto.value;
    const lunghezzaTesto = testo.length;


    if (lunghezzaTesto > 190) {
        inputContenuto.value = testo.substring(0, 190);
        lunghezza.textContent = "Caratteri: 190/190 (limite raggiunto)";
    } else {
        lunghezza.textContent = `Caratteri: ${lunghezzaTesto}/190`;
    }
});

const modal = document.getElementById('nuovaNota');
const noteForm = document.getElementById('nuovaNotaForm');

const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

let finalDate = new Date(year, month, day);

function openModalNota() {
    modal.showModal();
    noteForm.reset();
    document.getElementById('error-create-nota').remove();

}

noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const utente = JSON.parse(localStorage.getItem('utente'));
    const titolo = e.target.titolo.value;
    const descrizione = e.target.descrizione.value;
    const id_utente = +utente.id_utente;
    
    try {
        const res = await fetch('http://localhost:8000/newNote', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_utente,
                titolo,
                descrizione,
                data: finalDate.toISOString(),
            }),
        });

        if (res.status == 201) {
            modal.close();
            const firstNota = document.getElementById('firstNota');
            const tabella = document.getElementById('tabella');

            location.reload();
            // if (!firstNota.classList.contains('hidden')) {
            //     firstNota.classList.add('hidden');
            // }

            // if (tabella.classList.contains('hidden')) {
            //     tabella.classList.remove('hidden');
            // }

        } else {
            modal.close();
            const firstNota = document.getElementById('firstNota');

            const h1 = document.createElement('h1');
            h1.id = 'error-create-nota';
            h1.classList.add('text-red-500', 'text-center', 'text-xl', 'font-bold');
            h1.textContent = 'Errore creazione nuova nota, aggiornare la pagina e riprovare...';

            const parent = firstNota.parentNode;

            parent.insertBefore(h1, firstNota);
        }
    
    } catch(error) {
        console.log(error);
    }
})

async function deleteNota() {
    const utente = JSON.parse(localStorage.getItem('utente'));
    id_utente = +utente.id_utente;
    console.log(id_utente);
    try {
        const res = await fetch('http://localhost:8000/deleteNote', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_utente,
            }),
        });

        if (res.status == 201) {
            const countNote = await res.json();

            const oldTextNotNotification = document.getElementById('textNotNotification');
            if (oldTextNotNotification) {
                oldTextNotNotification.remove();
            }

            const h1 = document.createElement('h1');
            if (countNote.count == 1) {
                h1.textContent = `E' stata eliminata 1 notifica`;
            } else {
                h1.textContent = `Sono state elimiante ${countNote.count} notifiche`;
            }
            const tabella = document.getElementById('tabella');
            tabella.classList.add('hidden');
            const divEmpty = document.getElementById('divEmpty');

            const textNotNotification = document.createElement('div');
            textNotNotification.id = 'textNotNotification';
            textNotNotification.classList.add('flex', 'justify-center', 'items-center', 'm-10');
            divEmpty.appendChild(textNotNotification);

            const body = document.getElementById('textNotNotification');
            h1.classList.add('text-black', 'text-3xl', 'font-bold', 'mb-10');

            body.appendChild(h1);
        }
    } catch (error) {
        console.log(error);
    }
}
