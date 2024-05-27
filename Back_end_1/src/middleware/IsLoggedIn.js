import jwt from "jsonwebtoken";

export default function isLoggedIn(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);

    }

    jwt.verify(token, process.env.JWT_SECRET, (err, utente) => {

        if (err) {
            return res.sendStatus(401);
        }

        req.utente = utente;

        next();
    })
    
}