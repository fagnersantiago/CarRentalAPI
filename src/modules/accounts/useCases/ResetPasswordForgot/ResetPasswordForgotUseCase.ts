import { inject, injectable } from 'tsyringe';
import IDateProvider from '../../../../shared/container/Provider/DateProvider/IDateProvider';
import { AppErros } from '../../../../shared/errors/AppErrors';
import IUserRepository from '../../repositories/IUserRepository';
import IUsersTokens from '../../repositories/IUsersTokens';
import { hash } from 'bcrypt';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResestPassowordForgotUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private userTokenrepository: IUsersTokens,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('UserRepository')
        private usersRepository: IUserRepository,
    ) {}
    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = this.userTokenrepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppErros('Invalid Token!');
        }

        if (
            this.dateProvider.compareIfBefore(
                (await userToken).expires_date,
                this.dateProvider.dateNow(),
            )
        ) {
            throw new AppErros('Token expired!');
        }

        const user = await this.usersRepository.findById(
            (
                await userToken
            ).user_id,
        );

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.userTokenrepository.deleteById((await userToken).id);
    }
}

export default ResestPassowordForgotUseCase;
