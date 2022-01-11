import { inject, injectable } from 'tsyringe';
import ICategoryRepository from '../../repositories/ICategoryRepository';
import Category from '../../infra/typeorm/entities/Category';

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
