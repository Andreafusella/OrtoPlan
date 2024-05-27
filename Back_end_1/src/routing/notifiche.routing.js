import prisma from "../../db/prisma.js";

export default function notificheRouting(app){
    app.post('/notifiche', async (req, res) => {
        try {
            
            const notifiche = await prisma.notifiche.findMany({
                where: {
                    id_utente: req.body.id_utente,
                }
            });

            if (notifiche.length) {
                console.log('trovata');
                res.status(201);
                res.json (notifiche);
            } else {
                res.status(404);
                res.json ();
                console.log('non trovata');
            }


        } catch (error) {
            console.log(error);
            console.log('Errore ricerca notifiche');
        }
    })


    app.put('/notificheAdd', async (req, res) => {
        try {

            const notifica = await prisma.notifiche.create({
                data: {
                    id_utente: +req.body.id_utente,
                    id_piantagione: +req.body.id_piantagione,
                    testo: `Ricordati di annaffiare la piantagione: ${req.body.nome} tra 1 giorno`,
                    nome_piantagione: req.body.nome,
                }
            })
            
            res.status(201);
            res.json(notifica)

        } catch (error) {
            console.log(error);
            console.log('errore');
        }
    }) 

    app.put('/notificheSign', async (req, res) => {
        try {
            const signNotifica = await prisma.notifiche.update({
                where: {
                    id_notifica: +req.body.id_notifica
                },
                data: {
                    aperta: true,
                }
            })

            res.status(201)
            res.json(signNotifica)


        } catch(error) {
            console.log(error);
            console.log('errore sign notifica');
        }
    })

    app.get('/notificaImage', async (req, res) => {
        try{
            const notificaLetta = await prisma.notifiche.count({
                
                where: {
                    aperta: false
                }
            });
            
            console.log(notificaLetta);
            if(notificaLetta != 0){
                res.sendStatus(201);
                
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.log(error);
            console.log('errore ricerca immagine');
        }
    })
}