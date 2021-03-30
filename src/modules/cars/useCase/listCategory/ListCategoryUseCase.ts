import Category from '../../entities/Category';
import ICategoryRepository from '../../repositories/ICategoryRepository';

class ListCategoryUseCase {
    constructor(private listCategoryRepository: ICategoryRepository) {}

    execute(): Category[] {
        const categories = this.listCategoryRepository.list();

        return categories;
    }
}

export default ListCategoryUseCase;
