import MailProviderInMemory from '../../../../shared/container/Provider/DateProvider/MailProvider/InMemory/MailProviderInMemory';
import { AppErros } from '../../../../shared/errors/AppErrors';
import UserTokenRepository from '../../infra/typeorm/repositories/UserTokenRepository';
import UserRepositoryInMemory from '../../repositories/in-memory/UserRepositoryInMemory';
import SendForgotEmailUseCase from './SendForgotEmailUseCase';
import DayDateProvider from '../../../../shared/container/Provider/DateProvider/implamentation/DayDateProvider';

let sendForgotPasswordMailUseCase: SendForgotEmailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayDateProvider;
let userTokenInMemory: UserTokenRepository;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Email', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        dateProvider = new DayDateProvider();
        userRepositoryInMemory = new UserRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotEmailUseCase(
            userRepositoryInMemory,
            userTokenInMemory,
            dateProvider,
            mailProvider,
        );
    });

    it('Should be able to send a forgot password mail to user', async () => {
        //spyOn fica esperando se a função foi chamada
        const sendEmail = jest.spyOn(mailProvider, 'sendMail');

        await userRepositoryInMemory.create({
            driver_license: '154328',
            email: 'email@com.br',
            name: 'John Doe',
            password: '123456',
        });

        await sendForgotPasswordMailUseCase.execute('email@com.br');

        expect(sendEmail).toHaveBeenCalled();
    });

    it('Should not be able to send email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('qualquer@.email'),
        ).rejects.toEqual(new AppErros('User does not exists!'));
    });
});
