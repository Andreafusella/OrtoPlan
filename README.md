# OrtoPlan

## Descrizione del Progetto

OrtoPlan è un'applicazione web progettata per aiutare gli utenti a gestire la coltivazione delle loro piante orticole. L'applicazione offre strumenti per la pianificazione, gestione e monitoraggio delle attività legate alla coltivazione, utilizzando dati meteo per ottimizzare le operazioni.

## Funzionalità Principali

- **Autenticazione Utente**: Registrazione e login per gli utenti.
- **Gestione delle Piantagioni**: Creazione e gestione di più piantagioni separatamente, specificando le piante da coltivare e i periodi di coltivazione.
- **Pianificazione delle Attività**: Pianificazione delle attività legate alla coltivazione, come irrigazione, raccolta e trattamenti.
- **Notifiche**: Invio di notifiche per ricordare agli utenti le attività da svolgere.
- **Integrazione Meteo**: Utilizzo di API pubbliche per ottenere dati meteo locali e fornire raccomandazioni.
- **Interfaccia Web Responsive**: Accessibilità da dispositivi desktop e mobili.
- **Visualizzazione delle Previsioni Meteo**: Mostra previsioni meteorologiche attuali e future.
- **Persistenza dei Dati**: Utilizzo di un database per memorizzare informazioni sulle piantagioni.

## Tecnologie Utilizzate

### Front-end
- HTML
- CSS
- JavaScript

### Back-end
- [Express.js](https://expressjs.com/) (Node.js)

### Database
- MySQL

## Requisiti

- Node.js (se si utilizza Express.js)
- MySQL

## Installazione
Installazione dipendenze:
cd backend
npm install

Configurazione del Database:
Configura il tuo database PostgreSQL o MySQL e aggiorna il file di configurazione con le credenziali appropriate.

Configurazione delle variabili d'ambiente:
Nel file `.env` situato nel backend, cambia la variabile "DATABASE_URL" con il percorso esatto del tuo database

Avvio del server:
cd backend
npm start

Avvio del Front-end:
cd frontend
npx http-server

##Struttura del progetto
```bash
OrtoPlan/
├── Back_end_1/
│   ├── db/
│   │   └── prisma.js
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── prisma/
│   │   ├── migrations/
│   │   │   └── migration
│   │   └── schema.prisma
│   └── src/
│       ├── index.js
│       ├── middleware/
│       ├── routing/
│       │   ├── auth.routing.js
│       │   ├── notifiche.routing.js
│       │   ├── piantagione.routing.js
│       │   ├── piante.routing.js
│       │   └── user.routing.js
│       └── validation/
│           ├── piantagione.validations.js
│           └── utente.validations.js
├── Front_end_1/
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── assets/
│   │   ├── meteo/
│   │   ├── plants/
│   │   ├── script/
│   │   └── style/
│   ├── src/
│   │   └── index.js
│   ├── tailwind.config.js
│   └── views/
│       └── pages/
│           └── components/
├── LICENSE
└── README.md


