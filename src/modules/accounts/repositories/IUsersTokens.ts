import ICreateUserTokensDtos from '../dtos/ICreateUserTokensDtos';
import UserTokens from '../infra/typeorm/entities/UserToken';

interface IUsersTokens {
    create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokensDtos): Promise<UserTokens>;

    findByUserIdAndUserToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens>;

    deleteById(id: string): Promise<void>;
}

export default IUsersTokens;
