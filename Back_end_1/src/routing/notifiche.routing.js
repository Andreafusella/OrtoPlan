import prisma from "../../db/prisma.js";

export default function notificheRouting(app){
    app.post('/notifiche', async (req, res) => {
        try {
            console.log(req.body.id_utente);
            const notifiche = await prisma.notifiche.findMany({
                where: {
                    id_utente: req.body.id_utente,
                }
            });

            if (notifiche) {
                
                res.status(201);
                res.json (notifiche);
            } else {
                res.status(404);
                console.log('non trovata');
            }


        } catch (error) {
            console.log(error);
            console.log('Errore ricerca notifiche');
        }
    })
}