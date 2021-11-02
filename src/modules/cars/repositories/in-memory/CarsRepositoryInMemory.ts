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
        });

        this.cars.push(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }
}
export default CarsRepositoryInMemory;
