console.log('funzionaaaaa');

const loginForm = document.querySelector('#loginForm');
const loginModal = document.querySelector('#login');
const RegisterForm = document.querySelector('#registerForm');
const RegisterModal = document.querySelector('#register');

function openModalRegister(){
  RegisterModal.showModal();
  RegisterForm.reset();
  const inputNome = document.querySelector('#inputNome');
  const inputCognome = document.querySelector('#inputNome');
  const inputEmail = document.querySelector('#inputNomeRegister');
  const inputPassword = document.querySelector('#inputPasswordRegister');
  const inputRepeatPassword = document.querySelector('#inputRepeatPasswordRegister');

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

  //puo essere una semi sessione
  localStorage.setItem('utente', JSON.stringify(data.utente));
  localStorage.setItem('token', data.token);


  window.location.href = '/piantagione';
})



//REGISTRAZIONE
RegisterForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  document.querySelectorAll(".error-message").forEach((element) => {
    element.remove();
  });
  document.querySelectorAll(".input-error").forEach((element) => {
    element.classList.remove("input-error");
  });

  const nome = e.target.children[1].value
  const cognome = e.target.children[3].value
  const email = e.target.children[5].value
  const password = e.target.children[7].value
  const conferma_password = e.target.children[9].value

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
    console.log('errore');
    return
  }

  const data = await res.json();
  console.log(data);

  localStorage.setItem('utente', JSON.stringify(data.utente));
  localStorage.setItem('token', data.token);

  window.location.href = '/home';

})

function setErrLogin(){
  const inputEmail = document.querySelector('#inputEmailLogin');
  const inputPassword = document.querySelector('#inputPasswordLogin');
  const p = document.createElement("p");
  p.setAttribute("id", "errorLoginP");
  p.textContent = 'Credenziali non valide';
  p.classList.add("text-red-500", "error-message");
  inputEmail.classList.add('input-error');
  inputPassword.classList.add('input-error');
  inputPassword.parentNode.insertBefore(p, inputPassword.nextSibling);
}

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



