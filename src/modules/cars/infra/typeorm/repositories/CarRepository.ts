import { getRepository, Repository } from 'typeorm';
import ICreateCarDTO from '../../../dtos/ICreateCarDTO';
import ICarRepository from '../../../repositories/ICarRepository';
import Car from '../entities/Cars';

class CarsRepository implements ICarRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = getRepository(Car);
    }
    async create({
        name,
        brand,
        category_id,
        daily_rate,
        descritpion,
        fine_amount,
        license_plate,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            descritpion,
            fine_amount,
            license_plate,
            name,
        });

        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const findLicense = await this.repository.findOne({
            license_plate,
        });

        return findLicense;
    }
}

export default CarsRepository;
