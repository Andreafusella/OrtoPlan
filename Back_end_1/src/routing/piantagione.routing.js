import { json } from "express";
import prisma from "../../db/prisma.js";
import { addPiantagioneValidation } from '../validation/piantagione.validations.js'
export default function pianteRouting(app){
    app.post('/addPiantagione', addPiantagioneValidation, async (req, res) => {
        try {
            const pianta = await prisma.pianta.findFirst({
                where: {
                    nome: req.body.pianta,
                },
            });
    
            const newPiantagione = await prisma.piantagione.create({
                data: {
                    nome: req.body.nome,
                    n_slot: +req.body.numeroPiante,
                    data_inizio: req.body.date,
                    id_pianta: +pianta.id_pianta,
                    id_utente: +req.body.id_utente,
                    citta: req.body.citta,
                }
            });
    
            res.status(201);
            res.json (newPiantagione);
            

        } catch  (error) {
            console.log(error);
            console.log('errorrr');
        }
    })

    app.get('/piantagione', async (req, res) => {
        try {
            const piantagioni = await prisma.piantagione.findMany()
            const piante = await prisma.pianta.findMany();

            res.status(201);
            res.json ({piantagioni, piante});

        }catch (error) {
            
            console.log(error);
        }

    })

    app.delete('/piantagione', async (req, res) => {
        try {
            const deleteNotifiche = await prisma.notifiche.deleteMany({
                where: {
                    id_piantagione: +req.body.id_piantagione
                }
            })
            const deletePiantagione = await prisma.piantagione.delete({
                where: {
                    id_piantagione: +req.body.id_piantagione
                }
            })

            res.status(201);
            res.json (deletePiantagione);
            
        } catch(error) {
            console.log(error);
        }
    })

    app.put('/getCittaPiantagione', async (req, res) => {
        try {
            const id_piantagione = +req.body.id_piantagione;
            const piantagione = await prisma.piantagione.findFirst({
                where: {
                    id_piantagione: id_piantagione
                }
            });

            if (piantagione) {
                console.log('successo find piantagione citta');
                res.status(201);
                res.json(piantagione);
            } else {
                console.log('errore find piantagione citta');
                res.status(404);
            }

        } catch (error) {
            console.log(error);
            console.log('errore ricerca citta piantagioen');
        }
    });

    app.get('/num_piantagioni', async (req, res) => {
        try{
            const num_piantagioni = await prisma.piantagione.count({
                where: {
                    id_utente: +req.query.id_utente
                }
            });

            res.status(201).json(num_piantagioni);
        } catch(error) {
            console.log(error);
            console.log('errore ricerca num piantagioni');
        }
    })

    app.get('/getValoriNutrizionali', async (req, res) => {
        try {
            const pianta = await prisma.pianta.findFirst({
                where: {
                    id_pianta: +req.query.id_pianta
                }
            })
            if (pianta) {
                res.status(201).json(pianta)
            } else {
                res.status(404).json({message: 'pianta non trovata'});
            }
        } catch (error) {
            console.log(error);
            console.log('errore valori nutrizionali');
        }
    })
}