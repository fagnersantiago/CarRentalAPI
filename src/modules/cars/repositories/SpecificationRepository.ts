import Specification from '../model/Specification';
import ISpecificationRepository, {
    ISpecificationDTO,
} from './ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
    private specification: Specification[];

    constructor() {
        this.specification = [];
    }

    create({ name, description }: ISpecificationDTO): void {
        const specifications = new Specification();

        Object.assign(specifications, {
            name,
            description,
            created_at: new Date(),
        });

        this.specification.push(specifications);
    }

    findByName(name: string): Specification {
        const specificationByName = this.specification.find(
            specification => specification.name === name,
        );

        return specificationByName;
    }
}

export default SpecificationRepository;
