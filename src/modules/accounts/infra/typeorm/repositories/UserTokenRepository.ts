import { getRepository, Repository } from 'typeorm';
import ICreateUserTokensDtos from '../../../dtos/ICreateUserTokensDtos';
import IUsersTokens from '../../../repositories/IUsersTokens';
import UserTokens from '../entities/UserToken';

class UserTokenRepository implements IUsersTokens {
    private repository: Repository<UserTokens>;
    constructor() {
        this.repository = getRepository(UserTokens);
    }
    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokensDtos): Promise<UserTokens> {
        const userTokens = this.repository.create({
            user_id,
            expires_date,
            refresh_token,
        });

        await this.repository.save(userTokens);

        return userTokens;
    }

    async findByUserIdAndUserToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens> {
        const userToken = await this.repository.findOne({
            user_id,
            refresh_token,
        });
        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.deleteById(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = await this.repository.findOne(refresh_token);

        return userToken;
    }
}

export default UserTokenRepository;
