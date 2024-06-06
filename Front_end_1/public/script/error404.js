
const domande = [
    'Qual è il colore tipico del pomodoro maturo?',
    'Come si chiama il composto chimico responsabile del colore rosso dei pomodori?',
    "Qual è l'origine geografica del basilico?",
    "Qual è il nome botanico del basilico più comune?",
    "In che periodo dell'anno si pianta il mais?",
    "Qual è il nome della parte femminile del fiore di mais?",
    "Qual è la parte del mais che viene utilizzata per fare la farina di mais?",
    "Qual è il contenuto principale delle carote che le rende benefiche per la vista?",
    "Qual è il nome del pigmento responsabile del colore arancione delle carote?",
    "Qual è l'origine geografica delle melanzane?",
    "Qual è il nome del composto amaro presente nelle melanzane?",
    "Qual è il frutto a cui appartengono i peperoni?",
    "Qual è il livello di pH ideale del terreno per coltivare peperoni?",
    "Qual è la principale fonte di proteine nei fagioli?",
    "Qual è il nome del processo di fissazione dell'azoto nell'atmosfera da parte dei fagioli?",
    "Qual è il contenuto principale dei limoni che li rende acidi?",
    "Qual è il nome del processo di produzione dei limoni senza semi?",
    "Qual è il principale acido presente negli agrumi, inclusa l'arancia?",
    "Qual è il paese leader nella produzione mondiale di arance?",
    "Qual è l'origine geografica dei pomodori?",
    "Qual è il nome scientifico del pomodoro?",
    "Qual è la varietà di pomodoro più comune utilizzata per fare il sugo?",
    "Qual è il composto chimico responsabile del sapore dolce del basilico?",
    "Qual è il nome della malattia delle piante di mais che può causare gravi danni alle coltivazioni?",
    "Qual è la parte del mais utilizzata per fare il pop corn?",
    "Qual è il nome della sostanza che conferisce il caratteristico sapore amaro alla lattuga?",
    "Qual è il contenuto principale delle foglie di lattuga che le rende croccanti?",
    "Qual è la varietà di carote che ha una forma allungata e conica?",
    "Qual è il nome del composto tossico presente nelle foglie e nei semi delle carote selvatiche?",
    "Qual è il nome botanico delle melanzane?",
    "Qual è il nome della sostanza che conferisce il caratteristico sapore amaro alle melanzane crude?",
    "Qual è il nome scientifico dei peperoni dolci?",
    "Qual è la varietà di fagioli più utilizzata nella cucina italiana per fare la minestra?",
    "Qual è il nome del processo di conservazione dei fagioli mediante l'immersione in salamoia?",
    "Qual è il contenuto principale dei limoni che li rende profumati?",
    "Qual è il nome della malattia delle piante di limone causata da un fungo?",
    "Qual è la varietà di arance più comune e diffusa?",
    "Qual è il nome del composto chimico che conferisce il colore arancione alle arance?",
    "Qual è il nome del processo di produzione delle arance senza semi?"
];

const risposte = [
    'Rosso',
    'Licopene',
    "L'India",
    "Ocimum basilicum",
    "Primavera",
    "Pannocchia",
    "Chicco",
    "Vitamina A",
    "Beta-carotene",
    "L'India.",
    "Solanina.",
    "Capsicum annuum",
    "6.0",
    "Proteina vegetale",
    "Fissazione dell'azoto",
    "L'acido citrico",
    "Parthenocarpia",
    "L'acido citrico",
    "Brasile",
    "Sud America",
    "Lycopersicum",
    "San Marzano",
    "Metilchavicol",
    "Ruggine del mais",
    "Chicco",
    "Lattucina",
    "L'acqua",
    "Nantes",
    "Cicutoxina",
    "Solanum melongena",
    "Solanina",
    "Capsicum annuum",
    "Borlotto",
    "Salamoia",
    "L'olio essenziale di limone",
    "L'oidio del limone",
    "Valencia",
    "Beta-carotene",
    "Parthenocarpia"
]
const domanda = document.getElementById('domanda');
const rispostaInput = document.getElementById('risposta');
const form = document.getElementById('formDomanda');

let indovinate = 0;
let sbagliate = 0;
let domandeRimaste = 10;

// Funzione per generare e presentare una nuova domanda
function mostraDomanda() {
    if (domandeRimaste > 0) {
        const index = Math.floor(Math.random() * domande.length);
        domanda.textContent = domande[index];

        let rispostaReal = risposte[index].toLowerCase();
        console.log(`Risposta Reale${rispostaReal}`);

        // Rimuovi l'ascoltatore dell'evento di invio del modulo prima di aggiungerne uno nuovo
        form.removeEventListener('submit');
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita l'invio del modulo
            verificaRisposta(index); // Passa l'indice della domanda alla funzione di verifica della risposta
        });
    } else {
        console.log('Punteggio finale:');
        console.log('Giuste', indovinate);
        console.log('Sbagliate', sbagliate);
    }
}

// Funzione per verificare la risposta dell'utente
function verificaRisposta(index) {
    let rispostaUtente = rispostaInput.value.trim().toLowerCase();
    let rispostaReal = risposte[index].toLowerCase();

    console.log(`Risposta Utente: ${rispostaUtente}`);
    console.log(`Risposta Reale: ${rispostaReal}`);

    if (rispostaUtente == rispostaReal) {
        indovinate += 1;
        console.log('Risposta corretta');
    } else {
        sbagliate += 1;
        console.log('Risposta sbagliata');
    }

    domandeRimaste--; // Riduci il numero di domande rimaste
    console.log("Domande rimaste: " + domandeRimaste);

    // Pulisci l'input e mostra una nuova domanda
    rispostaInput.value = '';
    mostraDomanda();
}

// Avvia il gioco mostrando la prima domanda
mostraDomanda();




// Funzione per generare e presentare una nuova domanda
// function mostraDomanda() {
//     if (domandeRimaste > 0) {
//         const index = Math.floor(Math.random() * domande.length);
//         domanda.textContent = domande[index];

//         // Rimuovi l'ascoltatore dell'evento di invio del modulo prima di aggiungerne uno nuovo
//         form.removeEventListener('submit', verificaRisposta);
//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const rispostaUtente = rispostaInput.value.trim().toLowerCase();
            
//             // Confronta la risposta dell'utente con quella corretta, assicurandoti che entrambe siano in lettere minuscole
//             if (rispostaUtente === risposte[index].toLowerCase()) {
//                 indovinate += 1;
//                 console.log('giusta');
//             } else {
//                 sbagliate += 1;
//                 console.log('sbagliata');
//             }

//             domandeRimaste--; // Riduci il numero di domande rimaste
//             console.log("Domande rimaste: " + domandeRimaste);

//             // Pulisci l'input e mostra una nuova domanda
//             rispostaInput.value = '';
//             mostraDomanda();
//         });
//     } else {
//         // Quando il numero di domande è arrivato a 0, mostra il punteggio finale
//         console.log("Punteggio finale:");
//         console.log("Domande indovinate: " + indovinate);
//         console.log("Domande sbagliate: " + sbagliate);
//     }
// }


// // Funzione per verificare la risposta dell'utente
// function verificaRisposta(e) {
//     e.preventDefault();
//     const rispostaUtente = rispostaInput.value.trim().toLowerCase();
//     const index = Math.floor(Math.random() * domande.length);
//     console.log(rispostaUtente);
//     console.log(risposte[index].toLowerCase());
//     // Confronta la risposta dell'utente con quella corretta, assicurandoti che entrambe siano in lettere minuscole
//     if (rispostaUtente === risposte[index].toLowerCase()) {
//         indovinate += 1;
//         console.log('giusta');
//     } else {
//         sbagliate += 1;
//         console.log('sbagliata');
//     }

//     domandeRimaste--; // Riduci il numero di domande rimaste
//     console.log("Domande rimaste: " + domandeRimaste);

//     // Pulisci l'input e mostra una nuova domanda
//     rispostaInput.value = '';
//     mostraDomanda();
// }


// // Avvia il gioco mostrando la prima domanda
// mostraDomanda();
