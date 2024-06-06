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


function openModificaModal(){
    document.getElementById('inputNome').value = utente.utente.nome;
    document.getElementById('inputCognome').value = utente.utente.cognome;
    document.getElementById('inputEmail').value = utente.email;
    document.getElementById('inputPassword').value = utente.password;
    modificaDialog.showModal();
}

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

modificaForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newNome = document.getElementById('inputNome').value;
    const newCognome = document.getElementById('inputCognome').value;
    const newEmail = document.getElementById('inputEmail').value;
    const newPassword = document.getElementById('inputPassword').value;
    const newRepeatPassword = document.getElementById('inputRepeatPassword').value;

    const validation = validate({
        newNome,
        newCognome,
        newEmail,
        newPassword,
        newRepeatPassword
    },
    {
        newNome: {
            presence: { allowEmpty: false },
            length: { minimum: 3 },
        },
        newCognome: {
            presence: { allowEmpty: false },
            length: { minimum: 3 },
        },
        newEmail: {
            presence: { allowEmpty: false },
        },
        newPassword: {
            presence: { allowEmpty: false },
            length: { minimum: 3 },
        },
        newRepeatPassword: {
            equality: 'newPassword',
        },
    });

    if (validation) {
        checkValidation(validation);
        return;
    }

    try {
        const res = await fetch('http://localhost:8000/modificaUtente', {
        body: JSON.stringify({
            id_utente,
            newNome,
            newCognome,
            newEmail,
            newPassword,
            newRepeatPassword,
        }),
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
        });

        if(res.status !== 200) {
            console.log('errore validation');
            const errore = document.getElementById('error_message');
            errore.classList.remove('hidden');
            return
        }


    } catch(error) {
        console.log(error);
        console.log('errore modifica utente');
    }
    

    // try {
    //     const res = await fetch(`http://localhost:8000/modifica_utente`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             id_utente,
    //             nome: newNome,
    //             cognome: newCognome,
    //             email: newEmail,
    //             password: newPassword,
    //         }),
    //     });

    //     if (res.status == 200) {
    //         const data = await res.json();
    //         localStorage.setItem('utente', JSON.stringify(data));

    //         nome.textContent = data.utente.nome;
    //         cognome.textContent = data.utente.cognome;
    //         email.textContent = data.email;
    //         password.textContent = data.password;

    //         modificaDialog.close();
    //     } else {
    //         console.log('Errore nella modifica dell\'utente');
    //     }
    // } catch (error) {
    //     console.log(error);
    //     console.log('Errore durante la modifica dell\'utente');
    // }
});

function checkValidation(validation) {
    Object.keys(validation).forEach((key) => {
      const el = document.querySelector(`input[name=${key}]`);
      setErr(el, validation[key]);
    });
  }
  
  function setErr(e, messages) {
    e.classList.add("input-error");
    messages.reverse().forEach((message) => {
      const p = document.createElement("p");
      p.textContent = message;
      p.classList.add("text-red-500", "error-message");
      e.parentNode.insertBefore(p, e.nextSibling);
    });
  }
  