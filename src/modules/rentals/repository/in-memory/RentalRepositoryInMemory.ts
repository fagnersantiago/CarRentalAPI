import rentalRoutes from '../../../../shared/infra/http/routes/rental.routes';
import { ICreateRentalDto } from '../../dtos/ICreateRentalDto';
import Rental from '../../infra/typeorm/entities/Rental';
import IRentalRepository from '../IRentalRepository';

class RentalRepositoryInMemory implements IRentalRepository {
    rental: Rental[] = [];

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rental.find(
            rental => rental.car_id === car_id && rental.end_date === null,
        );
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rental.find(
            rental => rental.user_id === user_id && rental.end_date === null,
        );
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDto): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.rental.push(rental);

        return rental;
    }

    async findByid(id: string): Promise<Rental> {
        const rental = this.rental.find(rental => rental.id === id);

        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rental.filter(rental => rental.user_id === user_id);
    }
}

export default RentalRepositoryInMemory;
