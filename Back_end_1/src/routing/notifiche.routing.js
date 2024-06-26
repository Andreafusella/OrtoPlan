import prisma from "../../db/prisma.js";

export default function notificheRouting(app){
    //tutte le notifiche
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
    });

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
            const controlloNotificaEliminata = await prisma.notificheEliminate.findFirst({
                where: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    tipo: 1,
                    data_invio: finalDate,
                }
            })
    
            if (!controlloNotifica && !controlloNotificaEliminata) {
                let notificaTesto = ''; 
    
                if (+req.body.giorni == 10) {
                    notificaTesto = `Tra 10 giorni devi raccogliere: ${req.body.nome}, della raccolta nella piantagione: ${req.body.nome}`;
                } else if (+req.body.giorni == 2) {
                    notificaTesto = `Tra 2 giorni devi raccogliere: ${req.body.nome}, della raccolta nella piantagione: ${req.body.nome}`;
                } else if (+req.body.giorni == 0) {
                    notificaTesto = `E' ora della raccolta nella piantagione: ${req.body.nome}`;
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
                    const notificaEliminata = await prisma.notificheEliminate.create({
                        data: {
                            id_utente: id_utente,
                            id_piantagione: id_piantagione,
                            tipo: 1,
                            data_invio: finalDate,
                        }
                    })
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

    //notifiche meteo
    app.post('/notificheMeteo', async (req, res) => {

        const nome_piantagione = req.body.nome_piantagione;
        const citta = req.body.citta;
        const id_utente = +req.body.id_utente;
        const id_piantagione = +req.body.id_piantagione;

        let data = new Date();
        const year = data.getFullYear();
        const month = data.getMonth();
        const day = data.getDate();
        let finalDate = new Date(year, month, day);

        try {
            const controlloNotifica = await prisma.notifiche.findFirst({
                where: {
                    id_utente: +req.body.id_utente,
                    id_piantagione: +req.body.id_piantagione,
                    data_invio: finalDate,
                    tipo: 2,
                }
            });
            const controlloNotificaEliminata = await prisma.notificheEliminate.findFirst({
                where: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    tipo: 2,
                    data_invio: finalDate,
                }
            })
            

            if (!controlloNotifica && !controlloNotificaEliminata) {
                let notificaTesto = '';

                notificaTesto = `Attenzione! Domani a ${citta} potrebbe piovere. Attenzione alla piantagione: ${nome_piantagione}`;
                const notifica = await  prisma.notifiche.create({
                    data: {
                        id_utente: id_utente,
                        id_piantagione: id_piantagione,
                        nome_piantagione: nome_piantagione,
                        testo: notificaTesto,
                        data_invio: finalDate,
                        tipo: 2,
                    }
                });
                const notificaEliminata = await prisma.notificheEliminate.create({
                    data: {
                        id_utente: id_utente,
                        id_piantagione: id_piantagione,
                        tipo: 2,
                        data_invio: finalDate,
                    }
                });

                res.status(201).json({notifica, notificaEliminata});
            } else {
                res.status(400).json({error: 'errore notifca meteo'});
            }
        } catch(error) {
            console.log(error);
            console.log('errore notifica meteo');
        }
    });
    
    //notifica pioggia oggi
    app.post('/notificheMeteoOggi', async (req, res) => {
        const nome_piantagione = req.body.nome_piantagione;
        const citta = req.body.citta;
        const id_utente = +req.body.id_utente;
        const id_piantagione = +req.body.id_piantagione;

        let data = new Date();
        const year = data.getFullYear();
        const month = data.getMonth();
        const day = data.getDate();
        let finalDate = new Date(year, month, day);

        try {
            const controlloNotifica = await prisma.notifiche.findFirst({
                where: {
                    id_utente: +req.body.id_utente,
                    id_piantagione: +req.body.id_piantagione,
                    data_invio: finalDate,
                    tipo: 4,
                }
            });
            const controlloNotificaEliminata = await prisma.notificheEliminate.findFirst({
                where: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    tipo: 4,
                    data_invio: finalDate,
                }
            });

            if (!controlloNotifica && !controlloNotificaEliminata) {
                let notificaTesto = '';

                notificaTesto = `In questo momento a ${citta} sta piovendo. Le irrigazioni vengono spostate di due giorni alla piantagione: ${nome_piantagione}`;
                const notifica = await  prisma.notifiche.create({
                    data: {
                        id_utente: id_utente,
                        id_piantagione: id_piantagione,
                        nome_piantagione: nome_piantagione,
                        testo: notificaTesto,
                        data_invio: finalDate,
                        tipo: 4,
                    }
                });
                const notificaEliminata = await prisma.notificheEliminate.create({
                    data: {
                        id_utente: id_utente,
                        id_piantagione: id_piantagione,
                        tipo: 4,
                        data_invio: finalDate,
                    }
                });

                res.status(201).json({notifica, notificaEliminata});
            } else {
                res.status(400).json({error: 'errore notifca meteo'});
            }
        } catch(error) {
            console.log(error);
            console.log('errore invio notifica pioggia oggi');
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
            const controlloNotificaEliminata = await prisma.notificheEliminate.findFirst({
                where: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    tipo: 0,
                    data_invio: finalDate,
                }
            });
    
            if (!controlloNotifica && !controlloNotificaEliminata) {
                let testoNotifica = '';
    
                if (giorni == 1) {
                    testoNotifica = `Ricordati! Tra ${giorni} giorno dovrai annaffiare la piantagione: ${nome_piantagione}`;
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
                    const notificaEliminata = await prisma.notificheEliminate.create({
                        data: {
                            id_utente: id_utente,
                            id_piantagione: id_piantagione,
                            tipo: 0,
                            data_invio: finalDate,
                        }
                    })
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
    
    //notifica caldo
    app.post('/notificheCaldo', async (req, res) => {
        const id_utente = +req.body.id_utente;
        const id_piantagione = +req.body.id_piantagione;
        const nome_piantagione = req.body.nome_piantagione;
        const citta = req.body.citta;

        let data = new Date();
        const year = data.getFullYear();
        const month = data.getMonth();
        const day = data.getDate();
        let finalDate = new Date(year, month, day);

        try{
            const controlloNotifica = await prisma.notifiche.findFirst({
                where: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    data_invio: finalDate,
                    tipo: 3,
                }
            });
            const controlloNotificaEliminata = await prisma.notificheEliminate.findFirst({
                where: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    tipo: 3,
                    data_invio: finalDate,
                }
            });
            if (!controlloNotifica && !controlloNotificaEliminata) {
                let testoNotifica = `Oggi a ${citta} sono previste temperature oltre i 30°, per non far seccare le piante, dare un po d'acqua alla piantagione: ${nome_piantagione}`;
                const notifica = await  prisma.notifiche.create({
                    data: {
                        id_utente: id_utente,
                        id_piantagione: id_piantagione,
                        nome_piantagione: nome_piantagione,
                        testo: testoNotifica,
                        data_invio: finalDate,
                        tipo: 3,
                    }
                });
                const notificaEliminata = await prisma.notificheEliminate.create({
                    data: {
                        id_utente: id_utente,
                        id_piantagione: id_piantagione,
                        tipo: 3,
                        data_invio: finalDate,
                    }
                });
                res.status(201).json(notifica);
            } else {
                console.log();
                res.status(400).json({error: 'errore notifca caldo'});
            }
        } catch(error) {
            console.log(error);
            console.log('errore invio notifica caldo error');
        }

        
    });

    //notifica letta
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
    });

    //cambio immagine per notifica non letta
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
    });

    //eliminazione notifiche
    app.delete('/deleteNotifiche', async (req, res) => {
        try {
            
            const notifiche = await prisma.notifiche.deleteMany({
                where: {
                    id_utente: +req.body.id_utente,
                }
            })

            if (notifiche) {
                console.log('elimiante con successo');
                res.status(201);
                res.json(notifiche);
            } else {
                console.log('non sono state trovate notifiche');
                res.status(404);
                res.json();
            }
        } catch(error) {
            console.log(error);
            res.status(500);
            res.json();
        }
    });

    
}