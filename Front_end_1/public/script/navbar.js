//cambio di bottone nella pagina iniziale nel caso l'utente fosse già loggato
const buttonContainer1 = document.getElementById('button-container');
const buttonContainer2 = document.getElementById('buttonAreaPrivata');

if (localStorage.getItem('utente') !== null) {
    const buttonEntra = document.createElement('a');
    buttonEntra.classList.add('btn', 'btn-primary', 'text-white');
    buttonEntra.href = '/piantagione';
    buttonEntra.textContent = 'Area Privata';

    buttonContainer1.appendChild(buttonEntra);

    const textEntra = document.createElement('h1');
    textEntra.classList.add('text-white', 'text-2xl', 'mb-3', 'text-center', 'mt-5', 'md:mt-0');
    textEntra.textContent = 'Accedi alla tua area privata!';

    const button2 = document.createElement('a');
    button2.classList.add('btn', 'btn-primary', 'text-white', 'mt-5');
    button2.href = '/piantagione';
    button2.textContent = 'Area Privata';

    buttonContainer2.appendChild(textEntra);
    buttonContainer2.appendChild(button2);

} else {

    const buttonLogin = document.createElement('button');
    buttonLogin.classList.add('btn', 'btn-primary', 'text-white');
    buttonLogin.setAttribute('onclick', 'openModalLogin()');
    buttonLogin.textContent = 'Login';

    const buttonRegister = document.createElement('button');
    buttonRegister.classList.add('btn', 'btn-primary', 'text-white');
    buttonRegister.setAttribute('onclick', 'openModalRegister()');
    buttonRegister.textContent = 'Registrati';

    buttonContainer1.appendChild(buttonLogin);
    buttonContainer1.appendChild(buttonRegister);

    const textEntra = document.createElement('h1');
    textEntra.classList.add('text-white', 'text-2xl', 'mb-3', 'text-center', 'mt-5', 'md:mt-0');
    textEntra.textContent = 'Entra ora a far parte del nostro team!';

    const button2 = document.createElement('button');
    button2.classList.add('btn', 'btn-primary', 'text-white', 'mt-5');
    button2.setAttribute('onclick', 'openModalRegister()');
    button2.textContent = 'Registrati qui!';

    buttonContainer2.appendChild(textEntra);
    buttonContainer2.appendChild(button2);
}