import prisma from "../../db/prisma.js";

export default function noteRouting(app) {

    //almeno una nota
    app.get('/firstNota', async (req, res) => {
        try {
            const nota = await prisma.note.findMany({
                where: {
                    id_utente: +req.query.id_utente,
                },
                orderBy: {
                    data_creazione: 'desc',
                }
            })

            if (nota) {
                res.status(201).json(nota);
            } else {
                res.status(404).json();
            }
        } catch(error) {
            console.log(error);
        }
    });

    app.put('/newNote', async (req, res) => {
        try {
            const newNota = await prisma.note.create({
                data: {
                    id_utente: +req.body.id_utente,
                    titolo: req.body.titolo,
                    data_creazione: req.body.data,
                    testo: req.body.descrizione,
                }
            });

            res.status(201).json(newNota)
        } catch(error) {
            console.log(error);
        }
    });

    app.delete('/deleteNote', async (req, res) => {
        try {
            const deleteNote = await prisma.note.deleteMany({
                where: {
                    id_utente: +req.body.id_utente,
                }
            })

            if (deleteNote) {
                res.status(201).json(deleteNote);
            } else {
                res.status(404).json();
            }
        } catch(error) {
            console.log(error);
        }
    })
}