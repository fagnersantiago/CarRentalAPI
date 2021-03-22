import Specification from '../model/Specification';

export interface ISpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    create({ name, description }: ISpecificationDTO): void;
    list(): Specification[];
    findByName(name: string): Specification;
}

export default ISpecificationRepository;
