
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
let giuste = 0;
let sbagliate = 0;
let currentIndex = -1;
let questionCount = 0;
const maxQuestions = 10;

const game_container = document.getElementById('game-container');
function gameStart(){
    game_container.classList.remove('hidden');
    

}

function getRandomQuestion() {
    const domande_rimanenti = document.getElementById('domande_rimanenti');

    if (questionCount >= maxQuestions) {

        const messaggio = document.getElementById('messaggio');
        const messaggioConsiglio = document.getElementById('messaggioConsiglio');
        const img = document.getElementById('imgPunteggio');
        img.classList.add('h-[350px]');
        const punteggio = document.getElementById('punteggio');
        const giusteCell = document.getElementById('giuste');
        const sbagliateCell = document.getElementById('sbagliate');
        const buttonGameStart = document.getElementById('gameStart');

        if (giuste >= 0 && giuste <= 3) {
            messaggio.textContent = `Non sei stato molto bravo!`;
            img.src = '/plants/peperone_piange.png';
            messaggioConsiglio.textContent = '(shhh.... meglio andare a ripassare...)';
        } else if (giuste > 3 && giuste < 8) {
            messaggio.textContent = `Ci sai fare abbastanza con gli ortaggi!`;
            img.src = 'plants/cocomero_felice.png';
        } else {
            messaggio.textContent = `Congratulazioni! Sei un contadino nato!`;
            img.src = 'assets/contadina.png';
        }

        buttonGameStart.onclick = null;
        giusteCell.textContent = giuste;
        sbagliateCell.textContent = sbagliate;
        game_container.classList.add('hidden');
        punteggio.classList.remove('hidden');
        return;
    }

    domande_rimanenti.textContent = questionCount;
    currentIndex = Math.floor(Math.random() * domande.length);
    document.getElementById('question').innerText = domande[currentIndex];
    questionCount++;
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim();
    if (userAnswer.toLowerCase() === risposte[currentIndex].toLowerCase()) {
        giuste++;
        document.getElementById('result').innerText = 'Risposta corretta!';
        document.getElementById('result').classList.add('text-green-500');
        document.getElementById('result').classList.remove('text-red-500');
    } else {
        sbagliate++;
        document.getElementById('result').innerText = 'Risposta sbagliata!';
        document.getElementById('result').classList.add('text-red-500');
        document.getElementById('result').classList.remove('text-green-500');
    }
    document.getElementById('giuste').innerText = giuste;
    document.getElementById('sbagliate').innerText = sbagliate;
    document.getElementById('answer').value = '';
    getRandomQuestion();
}

window.onload = getRandomQuestion;



