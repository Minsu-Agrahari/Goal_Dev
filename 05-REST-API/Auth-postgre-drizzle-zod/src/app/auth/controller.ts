import type { Request, Response } from 'express'
import { signinPayloadModel, signupPayloadModel } from './models'
import { userTable } from '../../db/schema'
import { db } from '../../db/index'
import { eq } from 'drizzle-orm'
import { createHmac, randomBytes } from 'node:crypto'

class AuthenticationController {
    public async handleSignup(req: Request, res: Response) {
        
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

        const userEmailResult = await db.select().from(userTable).where(eq(userTable.email, email));

        if ( userEmailResult.length > 0 ) {
            return res.status(400)
                       .json({
                            error: 'duplicate entry',
                            message: `user with email ${email} already exists`
                       })
        }

        const salt = randomBytes(32).toString('hex');
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

        const [result] = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            salt,
        }).returning({ id: userTable.id });

        return res.status(201)
                  .json({
                    message: `user has been created successfully`,
                    data: {
                        id: result?.id
                    }
                  })
    }

    public async handleSignin
}

export default AuthenticationController;
