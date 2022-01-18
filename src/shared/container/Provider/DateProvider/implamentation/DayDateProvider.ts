import IDateProvider from '../IDateProvider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

class DayDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);
        return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'hours');
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    comparInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUtc(end_date);
        const start_date_utc = this.convertToUtc(start_date);
        return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'days');
    }

    addDays(days: number) {
        return dayjs().add(days, 'days').toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, 'hour').toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

export default DayDateProvider;
