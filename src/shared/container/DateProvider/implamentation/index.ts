import { container } from 'tsyringe';
import { IDateProvider } from '../IDateProvider';
import DayDateProvider from '../implamentation/DayDateProvider';

container.registerSingleton<IDateProvider>(
    'DayjsDateProvider',
    DayDateProvider,
);
