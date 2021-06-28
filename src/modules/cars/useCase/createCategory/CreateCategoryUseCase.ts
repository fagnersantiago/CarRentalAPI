import { inject, injectable } from 'tsyringe';
import { AppErros } from '../../../../errors/AppErrors';
import ICategoryRepository from '../../repositories/ICategoryRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoryRepository,
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryExist = await this.categoriesRepository.findByName(name);

        if (categoryExist) {
            throw new AppErros('Category already Exists');
        }

        await this.categoriesRepository.create({
            name,
            description,
        });
    }
}

export default CreateCategoryUseCase;
