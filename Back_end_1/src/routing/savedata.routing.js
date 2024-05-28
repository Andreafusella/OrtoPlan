import prisma from "../../db/prisma.js";

export default function saveDataRouting(app){
    
    //salva dati acqua
    app.post('/saveDataAcqua', async (req, res) => {
        
        try {

            const id_utente = +req.body.id_utente;
            const id_piantagione = +req.body.id_piantagione;
            const t_acqua = +req.body.t_acqua;
            const data_save = req.body.data_save;
            

            const saveData = await prisma.annaffiature.create({
                data: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    giorni_rimanenti: t_acqua,
                    data_save: data_save,
                },
            });

            const lastAnnaffiatura = await prisma.annaffiature.findFirst({
                where: {
                    id_utente: id_utente,
                    id_piantagione: id_piantagione,
                    giorni_rimanenti: t_acqua,
                    data_save: data_save,
                },
                orderBy: {
                    data_save: 'desc'
                },
            });


            console.log('corretto save data acqua');
            res.status(201);
            res.json(lastAnnaffiatura);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Errore save data acqua' });
        }
    })

    app.put('/getTimePianta', async (req, res) => {

        const id_pianta = +req.body.id_pianta;
        try{
            const pianta = await prisma.pianta.findFirst({
                where: {
                    id_pianta: id_pianta,
                }
            })

            res.staus(201);
            res.json(pianta);

        }catch(error){
            console.log(error);
            console.log('errore ricerca pianta save data');
        }
    })

    //SCRIVERE QUI
}