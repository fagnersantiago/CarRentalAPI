import ICategoryRepository from '../../repositories/ICategoryRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoryRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryExist = await this.categoriesRepository.findByName(name);

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
