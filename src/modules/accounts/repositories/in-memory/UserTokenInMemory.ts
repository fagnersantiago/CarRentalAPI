import ICreateUserTokensDtos from '../../dtos/ICreateUserTokensDtos';
import UserTokens from '../../infra/typeorm/entities/UserToken';
import IUsersTokens from '../IUsersTokens';

class UserTokenInMemory implements IUsersTokens {
    userToken: UserTokens[] = [];
    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokensDtos): Promise<UserTokens> {
        const userTokens = new UserTokens();

        Object.assign(userTokens, {
            user_id,
            expires_date,
            refresh_token,
        });

        this.userToken.push(userTokens);

        return userTokens;
    }

    async findByUserIdAndUserToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens> {
        const userToken = this.userToken.find(
            userToken =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token,
        );

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.userToken.find(find => find.id === id);

        this.userToken.splice(this.userToken.indexOf(userToken));
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.userToken.find(
            userToken => userToken.refresh_token === refresh_token,
        );

        return userToken;
    }
}

export default UserTokenInMemory;
