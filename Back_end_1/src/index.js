import express from 'express'
import 'dotenv/config'

import authRouting from './routing/auth.routing.js';
import pianteRouting from './routing/piante.routing.js';
import piantagioneRouting from './routing/piantagione.routing.js';
import notificheRouting from './routing/notifiche.routing.js';
import noteRouting from './routing/note.routing.js';

import cors from 'cors';
import validate from 'validate.js';
import moment from 'moment';

const app = express();
app.use(express.json()); //leggere correttamente i dati in json
app.use(express.urlencoded({extended:true})) //leggere correttamente i dati in post

app.use(cors({
    origin: ['http://127.0.0.1:5501', 'http://127.0.0.1:5500', 'http://localhost:3000'] // autorizza l'entrata solo a quel tipo di indirizzo
}));


app.get('/', (req, res) => {
    res.send("Entra");
})

authRouting(app);
pianteRouting(app);
piantagioneRouting(app);
notificheRouting(app);
noteRouting(app);



app.listen(process.env.PORT, () =>{
    console.log('Applicazione partita in 8000');
})
