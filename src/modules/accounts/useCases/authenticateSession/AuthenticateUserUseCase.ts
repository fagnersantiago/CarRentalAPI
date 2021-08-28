import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import IUserRepository from '../../repositories/IUserRepository';
import { AppErros } from '../../../../shared/errors/AppErrors';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    User: {
        name: string;
        email: string;
    };

    token: string;
}

@injectable()
class AuthenticateUserUserCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        // Verfica se usário existe
        if (!user) {
            throw new AppErros('Email or password incorret!');
        }

        // verifica se a senha existe
        const passwordMatch = compare(password, user.password);

        if (!passwordMatch) {
            throw new AppErros('Email or password incorret');
        }

        // Gerar JWT
        const token = sign({}, 'dd989dc91b2375c5a595082216eda09b', {
            subject: user.id,
            expiresIn: '1d',
        });

        const tokenReturn: IResponse = {
            token,
            User: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export default AuthenticateUserUserCase;
