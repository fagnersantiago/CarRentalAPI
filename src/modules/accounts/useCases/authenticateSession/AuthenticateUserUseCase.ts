import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import IUserRepository from '../../repositories/IUserRepository';
import { AppErros } from '../../../../shared/errors/AppErrors';
import IUsersTokens from '../../repositories/IUsersTokens';
import auth from '../../../../config/auth';
import IDateProvider from '../../../../shared/container/Provider/DateProvider/IDateProvider';

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
    refresh_token: string;
}

@injectable()
class AuthenticateUserUserCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokens,
        @inject('DayjsDateProvider')
        private dayjsRepository: IDateProvider,
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);
        const {
            secret_refresh_token,
            expires_in_token,
            secret_token,
            expires_in_refresh_token,
            expires_refresh_token_day,
        } = auth;

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
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.dayjsRepository.addDays(
            expires_refresh_token_day,
        );

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        const tokenReturn: IResponse = {
            token,
            User: {
                name: user.name,
                email: user.email,
            },
            refresh_token,
        };

        return tokenReturn;
    }
}

export default AuthenticateUserUserCase;
