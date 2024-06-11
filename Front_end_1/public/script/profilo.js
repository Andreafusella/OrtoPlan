// Ottieni i dati dell'utente dal localStorage
const utente = JSON.parse(localStorage.getItem('utente'));

const modificaDialog = document.getElementById('modificaDialog');
const modificaForm = document.getElementById('modificaForm');
const id_utente = +utente.id_utente;
const nome = document.getElementById('nome');
const cognome = document.getElementById('cognome');
const email = document.getElementById('email');
const n_piantagioni = document.getElementById('n_piantagioni');

nome.textContent = utente.utente.nome;
cognome.textContent = utente.utente.cognome;
email.textContent = utente.email;

num_pinatagioni();
async function num_pinatagioni(){
    try {
        const res = await fetch(`http://localhost:8000/num_piantagioni?id_utente=${id_utente}`, {
            method: 'GET',
        });

        if (res.status == 201) {
            const data = await res.json();
            n_piantagioni.textContent = data;
        } else {
        }
    } catch(error) {
        console.log(error);
        console.log('errore n_piantagioni');
    }
}