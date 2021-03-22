import ICategoryRepository from '../../repositories/ICategoryRepository';
import ISpecificationRepository from '../../repositories/ISpecificationRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private createSpecificationUsecase: ISpecificationRepository) {}

    execute({ name, description }: IRequest): void {
        const specifiction = this.createSpecificationUsecase.findByName(name);

        if (specifiction) {
            throw new Error('Specification already Exists!');
        }

        this.createSpecificationUsecase.create({
            name,
            description,
        });
    }
}

export default CreateSpecificationUseCase;
