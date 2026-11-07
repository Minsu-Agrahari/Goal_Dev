import type { Request, Response } from 'express'
import { signinPayloadModel, signupPayloadModel } from './models'
import { userTable } from '../../db/schema'
import { db } from '../../db/index'
import { eq } from 'drizzle-orm'

class AuthenticationController {
    public async handleSigup(req: Request, res: Response) {
        
        const validationResult = await signupPayloadModel.safeParseAsync(req.body);

        // validation 
        if ( validationResult.error ){
            return res.status(400)
                      .json({
                            message: 'body validation failed', 
                            error: validationResult.error.issues
                        });
        }

        // de-structure the object
        const { firstName, lastName, email, password } = validationResult.data;

        // const userEmailResult = await db.select().from(userTable).where(eq(userTable.email, email));
    }
}