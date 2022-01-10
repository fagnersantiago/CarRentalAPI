import { ICreateRentalDto } from '../dtos/ICreateRentalDto';
import Rental from '../infra/typeorm/entities/Rental';

interface IRentalRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create({ car_id, expected_return_date, user_id }): Promise<Rental>;
}

export default IRentalRepository;
