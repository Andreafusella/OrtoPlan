import validate from "validate.js";
import prisma from "../../db/prisma.js";

validate.validators.piantaExists = function (value, options, key, attributes) {
    console.log(value);
    return new Promise(async (res, rej) => {
        try {
            if (!value) {
                rej ('il nome della pianta non è stato dato');
                return
            }
            const namePianta = await prisma.pianta.findFirst({
                where: {
                    nome: value
                }
            });
            if (!namePianta) {
                res({ piantaExists: 'La pianta non esiste'})
                return
            } 
            
            res()
        } catch (error) {
            console.log('errore ricerca pianta');
            console.error('Errore durante la verifica della pianta:', error);
            reject('Errore durante la verifica della pianta');
        }
    });
}

export function addPiantagioneValidation(req, res, next) {
    validate.async(req.body, {
        nome: {
            presence: { allowEmpty: false },
        },
        numeroPiante: {
            presence: { allowEmpty: false },
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 1,
                lessThanOrEqualTo: 25,
                message: "Il numero di piante deve essere compreso tra 1 e 25"
            }
        },
        pianta: {
            piantaExists: {}
        }
    }).then(
        () => {
            next()
        },
        (errors) => {
            res.status(403);
            res.json({ isError: true, error: errors });
        }
    )
}