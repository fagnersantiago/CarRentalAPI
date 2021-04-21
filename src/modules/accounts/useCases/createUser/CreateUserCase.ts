import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import { hash } from 'bcrypt';
import IUserRepository from '../../entities/repositories/IUserRepository';

@injectable()
class CreateUserCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8);

        const emailAlreadyExist = await this.userRepository.findByEmail(email);

        if (emailAlreadyExist) {
            throw Error('Email already exists');
        }

        await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export default CreateUserCase;
