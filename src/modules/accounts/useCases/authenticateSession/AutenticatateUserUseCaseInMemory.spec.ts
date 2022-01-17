import { AppErros } from '../../../../shared/errors/AppErrors';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import UserRepositoryInMemory from '../../repositories/in-memory/UserRepositoryInMemory';
import CreateUserCase from '../createUser/CreateUserCase';
import AuthenticateUserUserCase from './AuthenticateUserUseCase';

let authenticateUseCase: AuthenticateUserUserCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserCase: CreateUserCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUseCase = new AuthenticateUserUserCase(
            userRepositoryInMemory,
        );
        createUserCase = new CreateUserCase(userRepositoryInMemory);
    });

    it('should be able to authenticate an user', async () => {
        //cria usuário
        const user: ICreateUserDTO = {
            driver_license: '001234',
            email: 'email@teste.com',
            password: '1234',
            name: 'John Doe',
        };
        //salva usuário
        await createUserCase.execute(user);

        //verifica se o usuário está autenticado
        const auth = await authenticateUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(auth).toHaveProperty('token');
    });

    //não autentica um usuário que não existe
    it('should not be able to authenticate an none existents user', async () => {
        await expect(
            //verifica se o email existe
            authenticateUseCase.execute({
                email: 'false@email.com',
                password: '123',
            }),
        ).rejects.toEqual(new AppErros('Email or password incorret!', 401));
    });
    //não autentica usuário com senha incorreta
    it('should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUserDTO = {
            driver_license: '0093',
            email: 'user@email.test.com',
            password: '1234',
            name: 'John Doe',
        };

        await createUserCase.execute(user);

        await expect(
            authenticateUseCase.execute({
                email: user.email,
                password: '1426',
            }),
        ).rejects.toEqual(new AppErros('Email or password incorret!', 401));
    });
});
