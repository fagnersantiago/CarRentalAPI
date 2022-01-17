import CreateCarSpecificationUseCase from './CreateCarSpeciticationUseCase';
import CarsRepositoryInMemory from '../../repositories/in-memory/CarsRepositoryInMemory';
import SpecificationInMemory from '../../repositories/in-memory/SpecificationInMenmory';
import { AppErros } from '../../../../shared/errors/AppErrors';

let carRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationRepositoryInMemory: SpecificationInMemory;

describe('CreateCarSpecification', () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carRepositoryInMemory,
            specificationRepositoryInMemory,
        );
    });
    it('Should  not be able add  a new  specification to non-existent car', async () => {
        const car_id = '123';
        const specification_id = ['123456'];

        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specification_id,
            }),
        ).rejects.toEqual(new AppErros('Car does not exists!'));
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
        const specification = await specificationRepositoryInMemory.create({
            description: 'test',
            name: 'test',
        });

        const car_id = car.id;
        const specification_id = [specification.id];

        const specificationsCar = await createCarSpecificationUseCase.execute({
            car_id,
            specification_id,
        });

        expect(specificationsCar).toHaveProperty('specifications');
        expect(specificationsCar.specification.length).toBe(1);
    });
});
