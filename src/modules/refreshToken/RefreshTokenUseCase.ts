import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import auth from '../../config/auth';
import { AppErros } from '../../shared/errors/AppErrors';
import IUsersTokens from '../accounts/repositories/IUsersTokens';
import IDateProvider from '../../shared/container/Provider/DateProvider/implamentation/DayDateProvider';

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokenRepository: IUsersTokens,
        @inject('DayjsDateProvider')
        private dayProvider: IDateProvider,
    ) {}
    async execute(token: string): Promise<string> {
        const { sub, email } = verify(token, auth.secret_token) as IPayload;

        const user_id = sub;
        const userToken =
            await this.usersTokenRepository.findByUserIdAndUserToken(
                user_id,
                token,
            );

        if (!userToken) {
            throw new AppErros('Refresh token does not exists!');
        }

        await this.usersTokenRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dayProvider.addDays(
            auth.expires_refresh_token_day,
        );

        await this.usersTokenRepository.create({
            user_id,
            expires_date,
            refresh_token,
        });

        return refresh_token;
    }
}

export default RefreshTokenUseCase;
