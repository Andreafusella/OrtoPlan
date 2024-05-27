import validate from "validate.js";
import prisma from "../../db/prisma.js";

const DB_PATH = "./db/users.json";

validate.validators.userExists = function (value, options, key, attributes) {
  console.log(value);
  return new Promise(async (res, rej) => {
    const user = await prisma.credenziali.findUnique({
      where: {
        email: value,
        // id: {
        //   not: options.id,
        // }
      }
    });
    if (user) {
      res("L'utente è già esistente");
    } else {
      res();
    }
  });
};

export function createUserValidation(req, res, next) {
  validate.async(req.body, {
    nome: {
      presence: { allowEmpty: false },
      length: { minimum: 3 },
    },
    cognome: {
      presence: { allowEmpty: false },
      length: { minimum: 3 },
    },
    password: {
      presence: {allowEmpty: false},
      length: { minimum: 3 },
    },
    conferma_password: {
      equality: 'password',
    },
    email: {
      userExists: {},
    },
  }).then(
    () => {
      // viene eseguita quando va tutto bene
      next();
    },
    (errors) => {
      // se c'è un errore
      res.status(403);
      res.json({ isError: true, error: errors });
    }
  );
}