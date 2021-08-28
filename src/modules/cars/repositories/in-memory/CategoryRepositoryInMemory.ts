import Category from '../../infra/typeorm/entities/Category';
import ICategoryRepository, {
    ICreateCategoryDTO,
} from '../ICategoryRepository';

class CategoriesRepositoryInMemory implements ICategoryRepository {
    categories: Category[] = [];
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(find => find.name === name);
        return category;
    }
    async list(): Promise<Category[]> {
        const listAll = this.categories;
        return listAll;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        this.categories.push(category);
    }
}

export default CategoriesRepositoryInMemory;
