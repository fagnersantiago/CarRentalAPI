import { inject, injectable } from 'tsyringe';
import { AppErros } from '../../../../shared/errors/AppErrors';
import IUserRepository from '../../repositories/IUserRepository';
import IUsersTokens from '../../repositories/IUsersTokens';
import { v4 as uuid } from 'uuid';
import IDateProvider from '../../../../shared/container/Provider/DateProvider/IDateProvider';
import IMailProvider from '../../../../shared/container/Provider/DateProvider/MailProvider/IMailProvider';
import { resolve } from 'path';

@injectable()
class SendForgotEmailUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,
        @inject('UsersTokensRepository')
        private usersToken: IUsersTokens,
        @inject('DayjsDateProvider')
        private dayDateProvider: IDateProvider,
        @inject('EtherealMailProvider')
        private etherealMail: IMailProvider,
    ) {}
    async execute(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        const templatePath = resolve(
            __dirname,
            '..',
            '..',
            'views',
            'email',
            'forgotSendEmail',
        );

        if (!user) {
            throw new AppErros('User does not exists!');
        }

        const token = uuid();

        const expires_date = this.dayDateProvider.addHours(3);

        await this.usersToken.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        const variable = {
            name: user.name,
            link: `${process.env.FORGOT_EMAIL_URL}${token}`,
        };

        await this.etherealMail.sendMail(
            email,
            'Recuperação de senha',
            variable,
            templatePath,
        );
    }
}

export default SendForgotEmailUseCase;
