import { container } from 'tsyringe';
import { IDateProvider } from '../IDateProvider';
import DayDateProvider from './DayDateProvider';

container.registerSingleton<IDateProvider>('DayDateProvider', DayDateProvider);
