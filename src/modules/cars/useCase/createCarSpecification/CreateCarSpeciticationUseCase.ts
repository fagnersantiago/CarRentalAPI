import { AppErros } from '../../../../shared/errors/AppErrors';
import ICarRepository from '../../repositories/ICarRepository';
import ISpecificationRepository from '../../repositories/ISpecificationRepository';

interface IRequest {
    car_id: string;
    specification_id: string[];
}
class CreateCarSpecificationUseCase {
    constructor(
        private carsRepository: ICarRepository,
        private specificationRepository: ISpecificationRepository,
    ) {}
    async execute({ car_id, specification_id }: IRequest): Promise<void> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppErros('Car does not exists!');
        }

        const specification = await this.specificationRepository.findByIds(
            specification_id,
        );

        carExists.specification = specification;

        await this.carsRepository.create(carExists);
    }
}

export default CreateCarSpecificationUseCase;
