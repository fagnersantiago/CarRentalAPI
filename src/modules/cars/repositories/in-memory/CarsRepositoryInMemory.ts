import { AppErros } from '../../../../shared/errors/AppErrors';
import ICreateCarDTO from '../../dtos/ICreateCarDTO';
import Car from '../../infra/typeorm/entities/Cars';
import ICarRepository from '../ICarRepository';

class CarsRepositoryInMemory implements ICarRepository {
    cars: Car[] = [];
    async create({
        brand,
        category_id,
        daily_rate,
        descritpion,
        fine_amount,
        name,
        license_plate,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            brand,
            category_id,
            daily_rate,
            descritpion,
            fine_amount,
            name,
            license_plate,
            specifications,
            id,
        });

        this.cars.push(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }
    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string,
    ): Promise<Car[]> {
        const all = this.cars.filter(car => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });
        return all;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(car => car.id === id);
    }
}
export default CarsRepositoryInMemory;
