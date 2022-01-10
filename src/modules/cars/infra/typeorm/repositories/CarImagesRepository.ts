import { Repository } from 'typeorm';
import ICarImageRepository from '../../../repositories/ICarImageRepository';
import CarImage from '../entities/CarImage';

class CarImagesRepository implements ICarImageRepository {
    private repositoy: Repository<CarImage>;
    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repositoy.create({
            car_id,
            image_name,
        });

        await this.repositoy.save(carImage);

        return carImage;
    }
}

export default CarImagesRepository;
