import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import SpecificationInMemory from '../../repositories/in-memory/SpecificationInMenmory';
import CreateCarSpecificationUseCase from './CreateCarSpeciticationUseCase';
import { AppErros } from '../../../../shared/errors/AppErrors';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationInMemory;

describe('CreateCarSpecification', () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carRepositoryInMemory,
            specificationRepositoryInMemory,
        );

        it('Should  not be able add  a new  specification to now-existent car', async () => {
            expect(async () => {
                const car_id = '123';
                const specification_id = ['123456'];

                await createCarSpecificationUseCase.execute({
                    car_id,
                    specification_id,
                });
            }).rejects.toBeInstanceOf(AppErros);
        });

        it('Should be able add  a new  specification to the car', async () => {
            const car = await carRepositoryInMemory.create({
                name: 'Name Car',
                descritpion: 'Descritpion Car',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 60,
                brand: 'brand',
                category_id: 'category',
            });
            const specification_id = ['123456'];

            await createCarSpecificationUseCase.execute({
                car_id: car.id,
                specification_id,
            });
        });
    });
});
