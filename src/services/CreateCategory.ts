import PostgresCategoryRepository from '../repositories/PostgresCategoryRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryServices {
    constructor(private categoriesRepository: PostgresCategoryRepository) {}

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

export default CreateCategoryServices;
