import { inject, injectable } from 'tsyringe';
import Category from '../../entities/Category';
import ICategoryRepository from '../../repositories/ICategoryRepository';

@injectable()
class ListCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private listCategoryRepository: ICategoryRepository,
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.listCategoryRepository.list();

        return categories;
    }
}

export default ListCategoryUseCase;
