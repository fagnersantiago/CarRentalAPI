import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { AppErros } from '../../../../shared/errors/AppErrors';
import Car from '../../infra/typeorm/entities/Cars';
import ICarRepository from '../../repositories/ICarRepository';
import ISpecificationRepository from '../../repositories/ISpecificationRepository';

interface IRequest {
    car_id: string;
    specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarRepository,
        @inject('SpecificationsRepository')
        private specificationRepository: ISpecificationRepository,
    ) {}
    async execute({ car_id, specification_id }: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppErros('Car does not exists!');
        }

        const specification = await this.specificationRepository.findByIds(
            specification_id,
        );

        carExists.specification = specification;

        await this.carsRepository.create(carExists);

        return carExists;
    }
}

export default CreateCarSpecificationUseCase;
