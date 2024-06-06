import express from 'express'
import 'dotenv/config'
import userRouting from './routing/user.routing.js';
import authRouting from './routing/auth.routing.js';
import pianteRouting from './routing/piante.routing.js';
import piantagioneRouting from './routing/piantagione.routing.js';
import notificheRouting from './routing/notifiche.routing.js';

import cors from 'cors';
import validate from 'validate.js';
import moment from 'moment';

const app = express();
app.use(express.json()); //leggere correttamente i dati in json
app.use(express.urlencoded({extended:true})) //leggere correttamente i dati in post

app.use(cors({
    origin: ['http://127.0.0.1:5501', 'http://127.0.0.1:5500', 'http://localhost:3000'] // autorizza l'entrata solo a quel tipo di indirizzo
}));

// validate.extend(validate.validators.datetime, {
//     parse: (value, options ) => {
//         return +moment.utc(value)
//     },
//     format: (value, options) => {
//         const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
//         return moment.utc(value).format(format);
//     }
// });

app.get('/', (req, res) => {
    res.send("Entra");
})

userRouting(app);
authRouting(app);
pianteRouting(app);
piantagioneRouting(app);
notificheRouting(app);



app.listen(process.env.PORT, () =>{
    console.log('Applicazione partita in 8000');
})
