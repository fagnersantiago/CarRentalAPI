import dayjs from 'dayjs';
import DayDateProvider from '../../../../shared/container/DateProvider/implamentation/DayDateProvider';
import { AppErros } from '../../../../shared/errors/AppErrors';
import RentalRepositoryInMemory from '../../repository/in-memory/RentalRepositoryInMemory';
import CreateRentalUseCase from './CreateRentalUseCase';

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUsecase: CreateRentalUseCase;
let dayjsDateProvider: DayDateProvider;

describe('Crate Rental', () => {
    const add24Horus = dayjs().add(1, 'day').toDate();
    beforeEach(() => {
        rentalRepositoryInMemory = new RentalRepositoryInMemory();
        dayjsDateProvider = new DayDateProvider();
        createRentalUsecase = new CreateRentalUseCase(
            rentalRepositoryInMemory,
            dayjsDateProvider,
        );
    });

    it('Should be able to create a new Rental', async () => {
        const rental = await createRentalUsecase.execute({
            user_id: '123',
            car_id: '123',
            expected_return_date: add24Horus,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new Rental if there is another open to the same user_id', async () => {
        expect(async () => {
            await createRentalUsecase.execute({
                user_id: '123',
                car_id: '123',
                expected_return_date: add24Horus,
            });

            const rental = await createRentalUsecase.execute({
                user_id: '123',
                car_id: '123',
                expected_return_date: add24Horus,
            });
        }).rejects.toBeInstanceOf(AppErros);
    });

    it('Should not be able to create a new Rental if there is another open to the same car', async () => {
        expect(async () => {
            await createRentalUsecase.execute({
                user_id: '321',
                car_id: 'test',
                expected_return_date: add24Horus,
            });

            await createRentalUsecase.execute({
                user_id: '321',
                car_id: 'test',
                expected_return_date: add24Horus,
            });
        }).rejects.toBeInstanceOf(AppErros);
    });

    it('should not be able to create  a new rental with invalid return time', async () => {
        expect(async () => {
            await createRentalUsecase.execute({
                user_id: '321',
                car_id: 'test',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppErros);
    });
});
