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
        brand,
        category_id,
        daily_rate,
        descritpion,
        fine_amount,
        license_plate,
        name,
        specifications,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            descritpion,
            fine_amount,
            license_plate,
            name,
            ...specifications,
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

    async findAvailable(brand?: string, category_id?: string, name?: string) {
        const carsQuery = await this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });

        if (brand) {
            carsQuery.andWhere('c.brand =: brand', { brand });
        }

        if (name) {
            carsQuery.andWhere('c.name =: name', { name });
        }

        if (category_id) {
            carsQuery.andWhere('c.category_id=: category_id', { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }
}

export default CarsRepository;
