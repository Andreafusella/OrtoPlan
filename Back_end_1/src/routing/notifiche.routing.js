import prisma from "../../db/prisma.js";

export default function notificheRouting(app){
    app.post('/notifiche', async (req, res) => {
        try {
            
            const notifiche = await prisma.notifiche.findMany({
                where: {
                    id_utente: req.body.id_utente,
                },
                orderBy: {
                    id_notifica: 'desc'
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
    app.post('/notificheAddRaccolta', async (req, res) => {
        try {
            const id_utente = +req.body.id_utente;
            const id_piantagione = +req.body.id_piantagione;
            const nome_piantagione = req.body.nome;
        

            let data = new Date();
    
            const year = data.getFullYear();
            const month = data.getMonth();
            const day = data.getDate();
    
            let finalDate = new Date(year, month, day);
    
            const controlloNotifica = await prisma.notifiche.findFirst({
                where: {
                    id_utente: +req.body.id_utente,
                    id_piantagione: +req.body.id_piantagione,
                    data_invio: finalDate,
                    tipo: 1,
                }
            });
    
            if (!controlloNotifica) {
                let notificaTesto = ''; 
    
                if (+req.body.giorni == 10) {
                    notificaTesto = `Tra 10 giorni devi raccogliere: ${req.body.nome}, della raccolta nella piantagione: ${req.body.nome}`;
                } else if (+req.body.giorni == 2) {
                    notificaTesto = `Tra 2 giorni devi raccogliere: ${req.body.nome}, della raccolta nella piantagione: ${req.body.nome}`;
                } else if (+req.body.giorni == 0) {
                    notificaTesto = `E' ora della raccolta di ${req.body.nome}, nella piantagione: ${req.body.nome}`;
                }
    
                if (notificaTesto) {
                    const notifica = await prisma.notifiche.create({
                        data: {
                            id_utente: id_utente,
                            id_piantagione: id_piantagione,
                            nome_piantagione: nome_piantagione,
                            testo: notificaTesto,
                            data_invio: finalDate,
                            tipo: 1,
                        }
                    });
                    res.status(201).json(notifica);
                } else {
                    res.status(400).json({ error: "Invalid giorni value" });
                }
            } else {
                console.log('notifica già inviata raccolta');
                res.status(200).json({ message: 'Notifica già inviata per questa data' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Errore notifica raccolta' });
        }
    });
    

    //notifiche acqua
    app.post('/notificheAddWater', async (req, res) => {
        try {
            const id_utente = +req.body.id_utente;
            const id_piantagione = +req.body.id_piantagione;
            const nome_piantagione = req.body.nome;
            const giorni = +req.body.giorni;
    
            let data = new Date();
            const year = data.getFullYear();
            const month = data.getMonth();
            const day = data.getDate();
            let finalDate = new Date(year, month, day);
    
            const controlloNotifica = await prisma.notifiche.findFirst({
                where: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    data_invio: finalDate,
                    tipo: 0,
                }
            });
    
            if (!controlloNotifica) {
                let testoNotifica = '';
    
                if (giorni == 1) {
                    testoNotifica = `Ricordati di annaffiare la piantagione: ${nome_piantagione} tra ${giorni} giorno`;
                } else if (giorni == 0) {
                    testoNotifica = `E' il momento di annaffiare la piantagione: ${nome_piantagione}`;
                }
    
                if (testoNotifica) {
                    const notifica = await prisma.notifiche.create({
                        data: {
                            id_utente: id_utente,
                            id_piantagione: id_piantagione,
                            testo: testoNotifica,
                            nome_piantagione: nome_piantagione,
                            data_invio: finalDate,
                            tipo: 0,
                        }
                    });
    
                    res.status(201).json(notifica);
                } else {
                    res.status(400).json({ error: "Invalid giorni value" });
                }
            } else {
                console.log('Notifica già inviata acqua');
                res.status(200).json({ message: 'Notifica già inviata per questa data' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Errore notifica acqua' });
        }
    });
    

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