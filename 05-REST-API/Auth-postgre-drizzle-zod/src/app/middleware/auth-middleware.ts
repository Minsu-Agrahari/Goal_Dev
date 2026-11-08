import type { Request, Response, NextFunction } from "express";
import { verifyUserToken } from "../auth/utils/token";

export function authenticationMiddleware () {
    
    return function (req: Request, res: Response, next: NextFunction) {
        const header = req.headers['authorization'];

        if (!header) next();

        if (!header?.startsWith('Bearer')) {
            return res.status(400).json({error: `authorization header must start with Bearer`});
        }

        const token = header.split(' ')[1];

        if (!token) return res.status(400).json({ error: 'authorization header must start with Bearer and followed by token'});

        const user = verifyUserToken(token);

        // @ts-ignore
        req.user = user;

        next();
    }
}

export function restrictToAuthenticationUser() {
    return function (req: Request, res:Response, next:NextFunction) {
        
        // @ts-ignore
        if (!req.user) return res.status(401).json({error: 'Authorication Request'});
        
        return next();
    }
}
