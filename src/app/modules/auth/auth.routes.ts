
import express from 'express';
import auth from '../../middlewares/auth';
import { authLimiter } from '../../middlewares/rateLimiter';
import { AuthController } from './auth.controller';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
    '/login',
    authLimiter,
    AuthController.loginUser
);

router.post('/signup', AuthController.signup);

router.post(
    '/refresh-token',
    AuthController.refreshToken
)

router.post(
    '/change-password',
    auth(
        Role.ADMIN,
    ),
    AuthController.changePassword
);

router.post(
    '/forgot-password',
    AuthController.forgotPassword
);

router.post(
    '/reset-password',
    AuthController.resetPassword
)

router.get(
    '/me',
    AuthController.getMe
)

export const AuthRoutes = router;