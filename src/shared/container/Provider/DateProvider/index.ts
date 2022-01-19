import { container } from 'tsyringe';
import IDateProvider from './IDateProvider';
import DayDateProvider from './implamentation/DayDateProvider';
import IMailProvider from './MailProvider/IMailProvider';
import EtherealMailProvider from '../DateProvider/MailProvider/implamentation/EtherealMailProvider';
import IStorageProvider from '../StorageProvider/IStorageProvider';
import LocalStorageProvider from '../StorageProvider/implamentations/LocalStorageProvider';
import S3StorageProvider from '../StorageProvider/implamentations/S3StorageProvider';

container.registerInstance<IDateProvider>(
    'DayjsDateProvider',
    new DayDateProvider(),
);

container.registerInstance<IMailProvider>(
    'EtherealMailProvider',
    new EtherealMailProvider(),
);

const diskStorage = {
    local: LocalStorageProvider,
    S2: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.DISK_STORAGE],
);
