import { response } from 'express';
import { container } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { ICreateRentalDto } from '../../../dtos/ICreateRentalDto';
import IRentalRepository from '../../../repository/IRentalRepository';
import Rental from '../entities/Rental';

class RentalRepository implements IRentalRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({ car_id });

        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({ user_id });

        return openByUser;
    }

    async create({ car_id, user_id, expected_return_date }): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        await this.repository.save(rental);

        return rental;
    }
}

export default RentalRepository;
