import express from 'express'
import type { Router } from 'express'

import AuthenticationController from './controller'

// Authentication instances
const authenticationController = new AuthenticationController();

export const authRouter: Router = express.Router();

// Routes
authRouter.post('/sign-up', authenticationController.handleSignup.bind(authenticationController));
authRouter.post('/sign-in', authenticationController.handleSignin.bind(authenticationController));

