import dayjs from 'dayjs';
import IDateProvider from '../../../../shared/container/Provider/DateProvider/IDateProvider';
import DayDateProvider from '../../../../shared/container/Provider/DateProvider/implamentation/DayDateProvider';
import { AppErros } from '../../../../shared/errors/AppErrors';
import CarsRepositoryInMemory from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalRepositoryInMemory from '../../repository/in-memory/RentalRepositoryInMemory';
import CreateRentalUseCase from './CreateRentalUseCase';

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUsecase: CreateRentalUseCase;
let dayjsDateProvider: IDateProvider;

describe('Crate Rental', () => {
    const dayAdd24Hours = dayjs().add(1, 'days').toDate();
    beforeEach(() => {
        rentalRepositoryInMemory = new RentalRepositoryInMemory();
        carRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayDateProvider();
        createRentalUsecase = new CreateRentalUseCase(
            rentalRepositoryInMemory,
            dayjsDateProvider,
            carRepositoryInMemory,
        );
    });

    it('Should be able to create a new Rental', async () => {
        const car = await carRepositoryInMemory.create({
            name: 'car test',
            descritpion: 'testing',
            daily_rate: 100,
            license_plate: 'test',
            fine_amount: 10,
            brand: 'brand test',
            category_id: '1234',
        });
        const rental = await createRentalUsecase.execute({
            user_id: '123',
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not be able to create a new Rental if there is another open to the same user', async () => {
        await rentalRepositoryInMemory.create({
            user_id: '12345',
            car_id: '12',
            expected_return_date: dayAdd24Hours,
        });

        await expect(
            createRentalUsecase.execute({
                user_id: '12345',
                car_id: '12456',
                expected_return_date: dayAdd24Hours,
            }),
        ).rejects.toEqual(
            new AppErros('There is a rental in progress for user'),
        );
    });

    it('Should not be able to create a new Rental if there is another open to the same car', async () => {
        await rentalRepositoryInMemory.create({
            user_id: '123',
            car_id: 'test',
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUsecase.execute({
                user_id: '321',
                car_id: 'test',
                expected_return_date: dayAdd24Hours,
            }),
        ).rejects.toEqual(new AppErros('Car unvailable'));
    });

    it('should not be able to create  a new rental with invalid return time', async () => {
        await expect(
            createRentalUsecase.execute({
                user_id: '321',
                car_id: 'test',
                expected_return_date: dayjs().toDate(),
            }),
        ).rejects.toEqual(new AppErros('invalid return time'));
    });
});
