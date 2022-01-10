import { getRepository, Repository } from 'typeorm';
import Specification from '../entities/Specification';
import ISpecificationRepository, {
    ICreateSpecificationDTO,
} from '../../../repositories/ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
    private specification: Repository<Specification>;

    constructor() {
        this.specification = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specifications = this.specification.create({
            name,
            description,
        });
        await this.specification.save(specifications);
        return specifications;
    }

    async list(): Promise<Specification[]> {
        const listSpecification = await this.specification.find();

        return listSpecification;
    }

    async findByName(name: string): Promise<Specification> {
        const specificationByName = await this.specification.findOne({ name });

        return specificationByName;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specification.findByIds(ids);
    }
}

export default SpecificationRepository;
