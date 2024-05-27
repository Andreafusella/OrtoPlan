
const nome_utente = document.querySelector('#nome_utente')

const utenteJSON = localStorage.getItem('utente');
if (utenteJSON) {

    const nome_utente = document.querySelector('#nome_utente')
    const nome_utente_sidebar = document.querySelector('#nome_utente_sidebar')
    const utente = JSON.parse(utenteJSON);
    console.log(utente);

    nome_utente.textContent = utente.utente.nome;
    nome_utente_sidebar.textContent = utente.utente.nome;
} else {
    console.log('errore in local storage');
}