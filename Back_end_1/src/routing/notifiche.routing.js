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


    //notifiche raccolta
    app.put('/notificheAddWater', async (req, res) => {
        try {
            if (+req.body.giorni == 10){
                const notifica = await prisma.notifiche.create({
                    data: {
                        id_utente: +req.body.id_utente,
                        id_piantagione: +req.body.id_piantagione,
                        nome_piantagione: req.body.nome,
                        testo: `Tra 10 giorni devi raccogliere: {nome pianta}, della raccolta nella piantagione: ${req.body.nome}`
                    }
                });
                res.status(201);
                res.json(notifica)

            } else if (+req.body.giorni == 2){
                const notifica = await prisma.notifiche.create({
                    data: {
                        id_utente: +req.body.id_utente,
                        id_piantagione: +req.body.id_piantagione,
                        nome_piantagione: req.body.nome,
                        testo: `Tra 2 giorni devi raccogliere: {nome pianta}, della raccolta nella piantagione: ${req.body.nome}`
                    }
                });
                res.status(201);
                res.json(notifica)
                
            } else if (+req.body.giorni == 0){
                const notifica = await prisma.notifiche.create({
                    data: {
                        id_utente: +req.body.id_utente,
                        id_piantagione: +req.body.id_piantagione,
                        nome_piantagione: req.body.nome,
                        testo: `E' ora della raccolta di {nome pianta}, nella piantagione: ${req.body.nome}`
                    }
                });
                res.status(201);
                res.json(notifica)

            }

        } catch(error) {
            console.log(error);
            console.log('errore notifica raccolta');
        }
    })

    //notifiche acqua
    app.put('/notificheAddWater', async (req, res) => {
        try {
            if (+req.body.giorni == 2){
                const notifica = await prisma.notifiche.create({
                    data: {
                        id_utente: +req.body.id_utente,
                        id_piantagione: +req.body.id_piantagione,
                        testo: `Ricordati di annaffiare la piantagione: ${req.body.nome} tra ${+req.body.giorni} giorni`,
                        nome_piantagione: req.body.nome,
                    }
                })
                
                res.status(201);
                res.json(notifica)

            } else if (+req.body.giorni == 0){
                const notifica = await prisma.notifiche.create({
                    data: {
                        id_utente: +req.body.id_utente,
                        id_piantagione: +req.body.id_piantagione,
                        testo: `E' il momento di annaffiare la piantagione: ${req.body.nome}`,
                        nome_piantagione: req.body.nome,
                    }
                })
                
                res.status(201);
                res.json(notifica)

            } else if (+req.body.giorni < 0){
                if(+req.body.giorni == -1){
                    let parola = 'giorno';
                }else {
                    let parola = 'giorni'
                }
                const notifica = await prisma.notifiche.create({
                    data: {
                        id_utente: +req.body.id_utente,
                        id_piantagione: +req.body.id_piantagione,
                        testo: `Hai saltato l'annaffiatura' nella pinatagione: ${req.body.nome} da {inserire giorni} ${parola}`,
                        nome_piantagione: req.body.nome,
                    }
                })

                res.status(201);
                res.json(notifica)
            }

        } catch (error) {
            console.log(error);
            console.log('errore notifica acqua');
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
            
            if(notificaLetta != 0){
                res.sendStatus(201);
                
            } else {
                res.status(404);
                res.json();
            }
        } catch (error) {
            console.log(error);
            console.log('errore ricerca immagine');
        }
    })
}