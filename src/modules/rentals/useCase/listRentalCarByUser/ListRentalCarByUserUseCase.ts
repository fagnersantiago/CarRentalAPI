import { inject, injectable } from 'tsyringe';
import Rental from '../../infra/typeorm/entities/Rental';
import IRentalRepository from '../../repository/IRentalRepository';

@injectable()
class ListRentalCarByUserUseCase {
    constructor(
        @inject('RentalRepository')
        private rentalRepository: IRentalRepository,
    ) {}
    async execute(user_id: string): Promise<Rental[]> {
        const rentalByUser = this.rentalRepository.findByUser(user_id);

        return rentalByUser;
    }
}
export default ListRentalCarByUserUseCase;
