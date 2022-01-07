import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import ListCarUseCase from './ListAvailableCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarUseCase: ListCarUseCase;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarUseCase = new ListCarUseCase(carsRepositoryInMemory);
    });

    it('Should be to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'SUV',
            descritpion: 'Hyundy',
            daily_rate: 140,
            license_plate: 'DEF-157',
            fine_amount: 100,
            brand: 'BMW i235',
            category_id: '2433c7ab-6813-43e5-971e-4b748e7c9059',
        });

        const cars = await listCarUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('should not be to list anvailable cars brand ', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'SUV',
            descritpion: 'Hyundy',
            daily_rate: 140,
            license_plate: 'DEF-157',
            fine_amount: 100,
            brand: 'BMW i235',
            category_id: '2433c7ab-6813-43e5-971e-4b748e7c9059',
        });

        const cars = await listCarUseCase.execute({
            brand: 'BMW i235',
        });
        expect(cars).toEqual([car]);
    });

    it('should not be to list anvailable cars name ', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'SUV',
            descritpion: 'Hyundy',
            daily_rate: 140,
            license_plate: 'DEF-157',
            fine_amount: 100,
            brand: 'BMW i235',
            category_id: '2433c7ab-6813-43e5-971e-4b748e7c9059',
        });

        const cars = await listCarUseCase.execute({
            name: 'SUV',
        });
        expect(cars).toEqual([car]);
    });
    it('should not be to list anvailable category_id', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'SUV',
            descritpion: 'Hyundy',
            daily_rate: 140,
            license_plate: 'DEF-157',
            fine_amount: 100,
            brand: 'BMW i235',
            category_id: '123456',
        });

        const cars = await listCarUseCase.execute({
            category_id: '123456',
        });
        expect(cars).toEqual([car]);
    });
});
