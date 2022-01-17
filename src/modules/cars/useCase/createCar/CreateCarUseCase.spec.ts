import { AppErros } from '../../../../shared/errors/AppErrors';
import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it('shoud be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name Car',
            descritpion: 'Descritpion Car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'brand',
            category_id: 'category',
        });
        expect(car).toHaveProperty('id');
    });

    it('shoud not be to create a car with exists license  plate', async () => {
        await createCarUseCase.execute({
            name: 'Car1',
            descritpion: 'Descritpion Car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'brand',
            category_id: 'category',
        });
        await expect(
            createCarUseCase.execute({
                name: 'Car2',
                descritpion: 'Descritpion Car',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 60,
                brand: 'brand',
                category_id: 'category',
            }),
        ).rejects.toEqual(new AppErros('Car already exists'));
    });

    it('shoud not be to create a car with available default true', async () => {
        const car = await createCarUseCase.execute({
            name: 'Car2',
            descritpion: 'Descritpion Car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'brand',
            category_id: 'category',
        });

        expect(car.available).toBe(true);
    });
});
