import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';
import IUserRepository from '../IUserRepository';

class UserRepositoryInMemory implements IUserRepository {
    users: User[] = [];
    async create({
        driver_license,
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            driver_license,
            name,
            email,
            password,
        });

        this.users.push(user);
    }
    async findByEmail(email: String): Promise<User> {
        return this.users.find(user => user.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }
}

export default UserRepositoryInMemory;
