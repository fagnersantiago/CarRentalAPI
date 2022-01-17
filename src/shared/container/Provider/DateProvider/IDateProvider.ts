interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;

    convertToUtc(date: Date): string;

    dateNow(): Date;

    comparInDays(start_date: Date, end_date: Date): number;

    addDays(days: number): Date;
}

export default IDateProvider;