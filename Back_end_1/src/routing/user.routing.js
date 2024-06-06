import prisma from "../../db/prisma.js";
import moment from "moment";
import path from 'path';
import isLoggedIn from "../middleware/IsLoggedin.js";
import bcrypt from 'bcrypt';
import {createUserValidation, modificaUserValidation} from "../validation/utente.validations.js";

export default function userRouting(app) {
    app.get('/home', isLoggedIn, async (req, res) => {
        //vede cio che scriviamo qui solo quando è loggato
    })

    app.post('modificaUtente', modificaUserValidation, async (req, res) => {
        const newUser = await prisma.utente.update({
            where: {
                id_utente: +req.body.id_utente
            },
            data: {
                nome: req.body.newNome,
                cognome: req.body.newCognome,
            }
        });
        const newCredenziali = await prisma.credenziali.update({
            where: {
                id_utente: +req.body.id_utente
            },
            data: {
                email: req.body.newEmail,
                password: req.body.newPassword,
            }
        })

        res.status(201);
        res.json ({newUser, newCredenziali});
    })
}