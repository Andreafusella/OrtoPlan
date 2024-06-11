//funzione di logout eliminando tutto il localstorage
function logout() {
    localStorage.clear();
    window.location.href = '/';
}

//un utente non può reindirizzarsi dove vuole senza aver fatto il login
if (localStorage.length === 0) {
    window.location.href = '/';
}
