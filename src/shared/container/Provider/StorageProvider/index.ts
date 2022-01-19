import { container } from 'tsyringe';
import LocalStorageProvider from './implamentations/LocalStorageProvider';
import S3StorageProvider from './implamentations/S3StorageProvider';
import IStorageProvider from './IStorageProvider';

const diskStorage = {
    local: LocalStorageProvider,
    S2: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.DISK_STORAGE],
);
