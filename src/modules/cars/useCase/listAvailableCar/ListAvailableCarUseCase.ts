import { inject, injectable } from 'tsyringe';
import Car from '../../infra/typeorm/entities/Cars';
import ICarRepository from '../../repositories/ICarRepository';

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListCarUseCase {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository,
    ) {}
    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carRepository.findAvailable(
            category_id,
            brand,
            name,
        );
        return cars;
    }
}
export default ListCarUseCase;
