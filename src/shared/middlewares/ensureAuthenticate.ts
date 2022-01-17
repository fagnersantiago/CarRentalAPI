import { AppErros } from '../errors/AppErrors';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../config/auth';
import UserTokenRepository from '../../modules/accounts/infra/typeorm/repositories/UserTokenRepository';

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;
    const userTokeneResponse = new UserTokenRepository();

    if (!authHeader) {
        throw new AppErros('Token  missing', 401);
    }

    const [, token] = authHeader.split(' ');
    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        const user = await userTokeneResponse.findByUserIdAndUserToken(
            user_id,
            token,
        );

        if (!user) {
            throw new AppErros('user does not exists!', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppErros('invalid token', 401);
    }
}
