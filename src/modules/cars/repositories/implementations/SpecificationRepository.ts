import Specification from '../../entities/Specification';
import ISpecificationRepository, {
    ISpecificationDTO,
} from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
    private specification: Specification[];

    private static INSTANCE: SpecificationRepository;

    private constructor() {
        this.specification = [];
    }

    public static getInstanceSpecification() {
        if (!SpecificationRepository.INSTANCE) {
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }

        return SpecificationRepository.INSTANCE;
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

    list(): Specification[] {
        return this.specification;
    }
    findByName(name: string): Specification {
        const specificationByName = this.specification.find(
            specification => specification.name === name,
        );

        return specificationByName;
    }
}

export default SpecificationRepository;
