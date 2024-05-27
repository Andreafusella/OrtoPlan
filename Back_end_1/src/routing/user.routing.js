import prisma from "../../db/prisma.js";
import moment from "moment";
import path from 'path';
import isLoggedIn from "../middleware/IsLoggedin.js";

export default function userRouting(app) {
    app.get('/home', isLoggedIn, async (req, res) => {
        //vede cio che scriviamo qui solo quando è loggato
    })


    app.post('registrazione', async (req, res) => {
        const newUser = await prisma.utente.create({
            nome: req.body.nome,
            cognome: req.body.cognome,
            email: req.body.email,
            password: req.body.password
        });

        res.status(201);
        res.json (newUser);
    })
}