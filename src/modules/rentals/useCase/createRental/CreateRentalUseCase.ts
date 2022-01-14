import { inject, injectable } from 'tsyringe';
import { IDateProvider } from '../../../../shared/container/DateProvider/IDateProvider';
import { AppErros } from '../../../../shared/errors/AppErrors';
import ICarRepository from '../../../cars/repositories/ICarRepository';
import Rental from '../../infra/typeorm/entities/Rental';
import IRentalRepository from '../../repository/IRentalRepository';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalRepository')
        private rentalRepository: IRentalRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('CarsRepository')
        private carRepository: ICarRepository,
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimunHours = 24;
        const carUnvailable = await this.rentalRepository.findOpenRentalByCar(
            car_id,
        );

        if (carUnvailable) {
            throw new AppErros('Car unvailable');
        }

        const rentalOpenToUser =
            await this.rentalRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppErros('There is a rental in progress for user');
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date,
        );

        if (compare < minimunHours) {
            throw new AppErros('invalid return time');
        }

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export default CreateRentalUseCase;
