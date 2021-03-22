import ICategoryRepository from '../../repositories/ICategoryRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoryRepository) {}

    execute({ name, description }: IRequest): void {
        const categoryExist = this.categoriesRepository.findByName(name);

        if (categoryExist) {
            throw new Error('Category already Exists');
        }

        this.categoriesRepository.create({
            name,
            description,
        });
    }
}

export default CreateCategoryUseCase;
