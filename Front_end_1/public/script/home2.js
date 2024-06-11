//inserisce il nome sulla navbar
const nome_utente = document.querySelector('#nome_utente');

const utenteJSON = localStorage.getItem('utente');
if (utenteJSON) {

    const nome_utente = document.querySelector('#nome_utente');
    const nome_utente_sidebar = document.querySelector('#nome_utente_sidebar');
    const utente = JSON.parse(utenteJSON);

    const nomeUtente = utente.utente.nome;
    if (nomeUtente.length > 7) {
        nome_utente_sidebar.innerHTML = nomeUtente.slice(0, 7) + '<br>' + nomeUtente.slice(7);
        nome_utente_sidebar.classList.add('text-xs');
        nome_utente_sidebar.classList.remove('text-xl');
    } else {
        nome_utente_sidebar.textContent = utente.utente.nome;
    }
    nome_utente.textContent = utente.utente.nome;
    
    
} else {

    console.log('errore in local storage');
}