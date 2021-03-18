import Specification from '../Specification';
import ISpecificationRepository from '../repositories/ISpecificationRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateSPecificationServices {
    constructor(private specificationRepository: ISpecificationRepository) {}
    execute({ name, description }: IRequest): void {
        const specificationExist = this.specificationRepository.findByName(
            name,
        );

        if (specificationExist) {
            throw Error('Specification Already exists');
        }

        this.specificationRepository.create({ name, description });
    }
}

export default CreateSPecificationServices;
