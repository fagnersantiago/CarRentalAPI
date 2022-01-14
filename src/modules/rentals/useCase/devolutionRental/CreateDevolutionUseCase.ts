import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/DateProvider/IDateProvider';
import { AppErros } from '../../../../shared/errors/AppErrors';
import ICarRepository from '../../../cars/repositories/ICarRepository';
import Rental from '../../infra/typeorm/entities/Rental';
import IRentalRepository from '../../repository/IRentalRepository';

interface IRequest {
    id: string;
    user_id: string;
}
@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject('RentalRepository')
        private rentalRepository: IRentalRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('CarsRepository')
        private carRepository: ICarRepository,
    ) {}
    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = this.rentalRepository.findByid(id);
        const car = this.carRepository.findById((await rental).car_id);
        const minimum_Daily = 1;

        if (!rental) {
            throw new AppErros('Rental does not exists!');
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.comparInDays(
            (await rental).start_date,
            this.dateProvider.dateNow(),
        );

        if (daily <= 0) {
            daily = minimum_Daily;
        }

        const daly = this.dateProvider.comparInDays(
            dateNow,
            (await rental).expected_return_date,
        );

        let total = 0;

        if (daly > 0) {
            const calculate_fine = daly * (await car).fine_amount;
            total = calculate_fine;
        }

        total += daly * (await car).daily_rate;

        (await rental).end_date = this.dateProvider.dateNow();
        (await rental).total = total;

        await this.rentalRepository.create(await rental);
        await this.carRepository.updateAvailable((await car).id, true);

        return rental;
    }
}

export default DevolutionRentalUseCase;
