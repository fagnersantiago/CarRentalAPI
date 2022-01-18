import { container } from 'tsyringe';
import IDateProvider from './IDateProvider';
import DayDateProvider from './implamentation/DayDateProvider';
import IMailProvider from './MailProvider/IMailProvider';
import EtherealMailProvider from '../DateProvider/MailProvider/implamentation/EtherealMailProvider';

container.registerInstance<IDateProvider>(
    'DayjsDateProvider',
    new DayDateProvider(),
);

container.registerInstance<IMailProvider>(
    'EtherealMailProvider',
    new EtherealMailProvider(),
);
