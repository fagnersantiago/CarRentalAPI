import { inject, injectable } from 'tsyringe';
import Car from '../../infra/typeorm/entities/Cars';
import ICarRepository from '../../repositories/ICarRepository';
import { AppErros } from '../../../../shared/errors/AppErrors';

interface IRequest {
    name: string;
    descritpion: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarRepository,
    ) {}
    async execute({
        name,
        descritpion,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<Car> {
        const carAlreadyExist = await this.carsRepository.findByLicensePlate(
            license_plate,
        );

        if (carAlreadyExist) {
            throw new AppErros('Car already exists');
        }
        const car = await this.carsRepository.create({
            name,
            descritpion,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return car;
    }
}

export default CreateCarUseCase;
