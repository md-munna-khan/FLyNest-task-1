import bcrypt from 'bcryptjs';
import prisma from '../../../shared/prisma';
import { createUserToken, createNewAccessTokenWithRefreshToken } from '../../../helpers/userToken';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status-codes';

type SignupPayload = {
    name: string;
    email: string;
    password: string;
    role?: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

const signup = async (payload: SignupPayload) => {
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already in use');
    }

    const hashed = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            passwordHash: hashed,
            role: payload.role ?? 'STUDENT'
        }
    });

    const tokens = createUserToken(user);

    return { user, ...tokens };
}

const loginUser = async (payload: { email: string; password: string }) => {
    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const match = await bcrypt.compare(payload.password, user.passwordHash);
    if (!match) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const tokens = createUserToken(user);
    return { user, ...tokens };
}

const refreshToken = async (token: string) => {
    const newTokens = await createNewAccessTokenWithRefreshToken(token);
    return newTokens;
}

// Stubs for legacy controller methods (not fully implemented here).
const changePassword = async (user: any, payload: any) => {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Change password not implemented');
}

const forgotPassword = async (payload: any) => {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Forgot password not implemented');
}

const resetPassword = async (token: string, payload: any) => {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Reset password not implemented');
}

const getMe = async (user: any) => {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Get me not implemented');
}

export const AuthServices = {
    signup,
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword,
    getMe
}