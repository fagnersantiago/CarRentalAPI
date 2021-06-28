import { AppErros } from '../errors/AppErrors';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserRepository from '../modules/accounts/entities/implamentation/UserRepository';

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppErros('Token  missing', 401);
    }

    const [, token] = authHeader.split(' ');
    try {
        const { sub: user_id } = verify(
            token,
            'dd989dc91b2375c5a595082216eda09b',
        ) as IPayload;

        const userRepository = new UserRepository();

        const user = await userRepository.findById(user_id);

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
