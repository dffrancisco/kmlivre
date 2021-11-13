import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const SALT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9COMUN'

const generateToken = async (data: object, expiresIn: string = '1d', WHERE: string = 'COMUM') => {

    let KEY = SALT_KEY;

    return jwt.sign(data, KEY, { expiresIn: expiresIn });
}

const decodeToken = (token: string | any, WHERE: string = 'COMUM'): string | object => {
    try {

        let KEY = SALT_KEY;

        return jwt.verify(token, KEY);

    } catch (error) {
        return { error: 'Invalid token !' }
    }
}

const authorize = function (req: Request, res: Response, next: NextFunction) {
    const token = req.body.token || req.query.token || req.headers['authorization'];

    let KEY = SALT_KEY

    if (!token) {
        res.status(401).json({ message: 'Acesso Restrito' });
    } else {
        jwt.verify(token, KEY, (error: any, decoded: any) => {

            if (error) {
                res.status(401).json({ message: 'Token Inválido' })
            } else {
                next();
            }
        });
    }
};


export default {
    generateToken,
    decodeToken,
    authorize,
    SALT_KEY
}