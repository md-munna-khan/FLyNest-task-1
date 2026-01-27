import type { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { jwtHelper } from "./jwtHelper";
import config from "../config";
import ApiError from "../app/errors/ApiError";
import { User } from "@prisma/client";
import prisma from "../shared/prisma";





export const createUserToken = (user: Partial<User>) => {
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = jwtHelper.generateToken(
        jwtPayload,
        config.jwt.jwt_secret as string,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelper.generateToken(
        jwtPayload,
        config.jwt.refresh_token_secret as string,
        config.jwt.refresh_token_expires_in as string
    );

    return { accessToken, refreshToken };
};


export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {
    const verifiedRefreshToken = jwtHelper.verifyToken(
        refreshToken,
        config.jwt.refresh_token_secret as string
    ) as JwtPayload;

    if (!verifiedRefreshToken || !verifiedRefreshToken.email) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
    }

    const user = await prisma.user.findUnique({
        where: { email: verifiedRefreshToken.email },
    });

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
    }

    // No additional status checks in this minimal schema; proceed.

    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = jwtHelper.generateToken(
        jwtPayload,
        config.jwt.jwt_secret as string,
        config.jwt.expires_in as string
    );

    const newRefreshToken = jwtHelper.generateToken(
        jwtPayload,
        config.jwt.refresh_token_secret as string,
        config.jwt.refresh_token_expires_in as string
    );

    // The original project referenced a `needPasswordChange` field which is
    // not present in the current Prisma schema. Return a sensible default.
    return { accessToken, refreshToken: newRefreshToken, needPasswordChange: false };
};
