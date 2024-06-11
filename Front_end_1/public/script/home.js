
const loginForm = document.querySelector('#loginForm');
const loginModal = document.querySelector('#login');
const RegisterForm = document.querySelector('#registerForm');
const RegisterModal = document.querySelector('#register');

//APERTURA MODAL REGISTRAZIONE
function openModalRegister(){
  RegisterModal.showModal();
  RegisterForm.reset();
  const inputNome = document.querySelector('#inputNome');
  const inputCognome = document.querySelector('#inputNome');
  const inputEmail = document.querySelector('#inputEmailRegister');
  const inputPassword = document.querySelector('#inputPasswordRegister');
  const inputRepeatPassword = document.querySelector('#inputRepeatPasswordRegister');
  const error_email = document.getElementById('error-email');

  error_email.remove();
  inputNome.classList.remove('input-error');
  inputCognome.classList.remove('input-error');
  inputEmail.classList.remove('input-error');
  inputPassword.classList.remove('input-error');
  inputRepeatPassword.classList.remove('input-error');
}

//APERTURA MODAL LOGIN
function openModalLogin(){
  loginModal.showModal();
  loginForm.reset();
  const inputEmail = document.querySelector('#inputEmailLogin');
  const inputPassword = document.querySelector('#inputPasswordLogin');
  const p = document.querySelector('#errorLoginP')
  p.remove();
  inputEmail.classList.remove('input-error');
  inputPassword.classList.remove('input-error');
} 

//LOGIN
loginForm.addEventListener('submit', async (e) => {
  
  e.preventDefault();
  const email = e.target.children[1].value;
  const password = e.target.children[3].value;

  console.log(email);
  console.log(password);
  console.log({email, password});

  try {

    const res = await fetch('http://localhost:8000/login', {
      body: JSON.stringify({
        email,
        password,
      }),
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (res.status !== 200) {
      console.log('errore');
      setErrLogin(); 
      return;
    }

    const data = await res.json();
    console.log(data);

    //puo essere una sessione
    localStorage.setItem('utente', JSON.stringify(data.utente));
    localStorage.setItem('token', data.token);


    window.location.href = '/piantagione';

  } catch(error) {
    console.log(error);
  }

  
})

//REGISTRAZIONE
RegisterForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  document.querySelectorAll(".error-message").forEach((element) => {
    element.remove();
  });
  document.querySelectorAll(".input-error").forEach((element) => {
    element.classList.remove("input-error");
  });

  const nome = e.target.children[1].value;
  const cognome = e.target.children[3].value;
  const email = e.target.children[5].value;
  const password = e.target.children[7].value;
  const conferma_password = e.target.children[9].value;

  const validation = validate({
    nome,
    cognome,
    email,
    password,
    conferma_password
  },
  {
    nome: {
      presence: { allowEmpty: false },
      length: { minimum: 3 },
    },
    cognome: {
      presence: { allowEmpty: false },
      length: { minimum: 3 },
    },
    password: {
      presence: { allowEmpty: false },
      length: { minimum: 3 },
    },
    conferma_password: {
      equality: 'password',
    },
    email: {
      presence: { allowEmpty: false },
    }
  });

  if (validation) {
    checkValidation(validation);
    return;
  }
  
  const res = await fetch('http://localhost:8000/registrazione', {
    body: JSON.stringify({
      nome,
      cognome,
      email,
      password,
      conferma_password,
    }),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }
  });

  if(res.status !== 200) {
    const errorData = await res.json();
    
    if (errorData.error && errorData.error.email) {
      const erroreEmail = document.createElement('h1');
      erroreEmail.id = 'error-email';
      erroreEmail.classList.add('error-message', 'text-red-500');
      erroreEmail.textContent = "L'email è già esistente";
      e.target.children[5].classList.add('input-error');
      e.target.children[5].parentNode.insertBefore(erroreEmail, e.target.children[5].nextSibling);
      return
    } else {
      const errore = document.getElementById('error_message');
      errore.classList.remove('hidden');
      return
    }
    
  }

  const data = await res.json();
  console.log(data);
  localStorage.setItem('utente', JSON.stringify(data.utente));
  localStorage.setItem('token', data.token);

  window.location.href = '/piantagione';

})

//imposta errori nel login
function setErrLogin(){
  const inputEmail = document.querySelector('#inputEmailLogin');
  const inputPassword = document.querySelector('#inputPasswordLogin');

  const p1 = document.querySelector('#errorLoginP');

  if (p1) {
    p1.remove();
  }

  const p = document.createElement("p");
  p.setAttribute("id", "errorLoginP");
  p.textContent = 'Credenziali non valide';
  p.classList.add("text-red-500", "error-message");
  inputEmail.classList.add('input-error');
  inputPassword.classList.add('input-error');
  inputPassword.parentNode.insertBefore(p, inputPassword.nextSibling);
}

//controllo la validation e assegna gli errori
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



