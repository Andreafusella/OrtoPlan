import prisma from "../../db/prisma.js";
import moment from "moment";
import path from 'path';
import isLoggedIn from "../middleware/IsLoggedin.js";
import bcrypt from 'bcrypt';
import {createUserValidation, modificaUserValidation} from "../validation/utente.validations.js";

export default function userRouting(app) {
    app.get('/home', isLoggedIn, async (req, res) => {
        //vede cio che scriviamo qui solo quando è loggato
    })
}