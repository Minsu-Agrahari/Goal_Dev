import express from 'express'
import type { Router } from 'express'

import AuthenticationController from './controller'
import { restrictToAuthenticationUser } from '../middleware/auth-middleware';

// Authentication instances
const authenticationController = new AuthenticationController();

export const authRouter: Router = express.Router();

// Routes
authRouter.post('/sign-up', authenticationController.handleSignup.bind(authenticationController));
authRouter.post('/sign-in', authenticationController.handleSignin.bind(authenticationController));

authRouter.get('/me', restrictToAuthenticationUser() , authenticationController.handleMe.bind(authenticationController));
