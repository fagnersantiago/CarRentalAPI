import { NextFunction, Request, Response } from 'express';
import UserRepository from '../../modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppErros } from '../errors/AppErrors';

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { id } = request.user;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppErros('User is not Admin!');
    }

    return next();
}
