import { getRepository, Repository } from 'typeorm';
import Specification from '../../entities/Specification';
import ISpecificationRepository, {
    ISpecificationDTO,
} from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
    private specification: Repository<Specification>;

    constructor() {
        this.specification = getRepository(Specification);
    }

    async create({ name, description }: ISpecificationDTO): Promise<void> {
        const specifications = this.specification.create({
            name,
            description,
        });
        await this.specification.save(specifications);
    }

    async list(): Promise<Specification[]> {
        const listSpecification = await this.specification.find();

        return listSpecification;
    }

    async findByName(name: string): Promise<Specification> {
        const specificationByName = await this.specification.findOne({ name });

        return specificationByName;
    }
}

export default SpecificationRepository;
