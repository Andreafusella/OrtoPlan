import jwt from "jsonwebtoken";
import prisma from "../../db/prisma.js";
import bcrypt from 'bcrypt';
import { createUserValidation } from '../validation/utente.validations.js'

export default function authRouting(app) {
    
    //login
    app.post('/login', async (req, res) => {

        const utente = await prisma.credenziali.findFirst({
            where: {
                email: req.body.email,
            },
            include: {
                utente: true,
            }
        });

        const confrontoCredenziali = await bcrypt.compare(req.body.password, utente.password);

        if (!confrontoCredenziali) {
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
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        try {

            const newUtente = await prisma.utente.create({
                data: {
                    nome: req.body.nome,
                    cognome: req.body.cognome,
                }
            });
            const credenziali = await prisma.credenziali.create({
                data: {
                    id_utente: newUtente.id_utente,
                    email: req.body.email,
                    password: hashedPassword,
                }
            });

            const utente = await prisma.credenziali.findFirst({
                where: {
                    email: req.body.email,
                },
                include: {
                    utente: true,
                }
            })

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



        } catch (error){
            res.status(500).json({ error: 'Errore durante la registrazione'});
        }
    })
}