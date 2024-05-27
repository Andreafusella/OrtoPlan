import jwt from "jsonwebtoken";
import prisma from "../../db/prisma.js";
import { createUserValidation } from '../validation/utente.validations.js'

export default function authRouting(app) {
    
    //login
    app.post('/login', async (req, res) => {
        const utente = await prisma.credenziali.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password
            },
            include: {
                utente: true,
            }
        });

        if (!utente) {
            res.status(422);
            res.json({ message: 'Credenziali non valide'});
            return
        }

        const token = jwt.sign(
            utente,
            process.env.JWT_SECRET,
            {
                expiresIn : '1y'
            }
        );

        res.json({
            utente,
            token,
        });

    });

    app.post('/registrazione', createUserValidation, async (req, res) => {
        try {

            const newUtente = await prisma.utente.create({
                data: {
                    nome: req.body.nome,
                    cognome: req.body.cognome,
                }
            });
            const newUtenteCredenziali = await prisma. credenziali.create({
                data: {
                    id_utente: newUtente.id_utente,
                    email: req.body.email,
                    password: req.body.password,
                }
            })

            res.status(200).json({
                message: 'Registrazione avvenuta',
                utente: newUtente,
                credenziali: newUtenteCredenziali,
            });

        } catch (error){
            res.status(500).json({ error: 'Errore durante la registrazione'});
        }
        
    })
}