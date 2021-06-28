import { inject, injectable } from 'tsyringe';
import { AppErros } from '../../../../errors/AppErrors';
import ISpecificationRepository from '../../repositories/ISpecificationRepository';

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationRepository')
        private createSpecificationUsecase: ISpecificationRepository,
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specifiction = await this.createSpecificationUsecase.findByName(
            name,
        );

        if (specifiction) {
            throw new AppErros('Specification already Exists!');
        }

        this.createSpecificationUsecase.create({
            name,
            description,
        });
    }
}

export default CreateSpecificationUseCase;
