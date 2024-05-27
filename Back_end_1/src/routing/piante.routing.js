import prisma from "../../db/prisma.js";

export default function pianteRouting(app) {
    app.get('/piante', async (req,res) => {

        const piante = await prisma.pianta.findMany();

        res.status(201);
        res.json(piante)
    })

    app.get('/piantagioni', async (req, res) => {

        try {
            const piante = await prisma.pianta.findMany();

            res.status(200);
            res.json(piante)
        } catch (error) {
            res.status(500).json({ error: 'Errore durante la registrazione'});
        }
    })
}