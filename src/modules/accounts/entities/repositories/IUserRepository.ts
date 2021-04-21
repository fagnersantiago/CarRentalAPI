import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../entities/User';

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: String): Promise<User>;
}

export default IUserRepository;
