import { getRepository, Repository } from 'typeorm';
import User from '../../entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUserRepository from '../repositories/IUserRepository';

class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        email,
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
}

export default UserRepository;
