import { container } from 'tsyringe';
import IMailProvider from './IMailProvider';
import EtherealMailProvider from './implamentation/EtherealMailProvider';
import SesMailProvider from './implamentation/SesMailProvider';

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SesMailProvider),
};
container.registerInstance<IMailProvider>(
    'EtherealMailProvider',
    mailProvider[process.env.MAIL_PROVIDER],
);
