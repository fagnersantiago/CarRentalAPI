import { inject, injectable } from 'tsyringe';
import CarImage from '../../infra/typeorm/entities/CarImage';
import ICarImageRepository from '../../repositories/ICarImageRepository';

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor(
        @inject('CarImagesRepository')
        private carImageRepository: ICarImageRepository,
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async image => {
            await this.carImageRepository.create(car_id, image);
        });
    }
}

export default UploadCarImageUseCase;
