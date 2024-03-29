import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';
import ICategoryRepository, {
    ICreateCategoryDTO,
} from '../../../../cars/repositories/ICategoryRepository';

class CategoriesRepository implements ICategoryRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const category = await this.repository.find();

        return category;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });

        return category as Category;
    }
}

export default CategoriesRepository;
