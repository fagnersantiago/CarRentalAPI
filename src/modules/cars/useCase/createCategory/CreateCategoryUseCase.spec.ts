import { AppErros } from '../../../../errors/AppErrors';
import CategoriesRepositoryInMemory from '../../repositories/in-memory/CategoryRepositoryInMemory';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let createReposytoryInMemory: CategoriesRepositoryInMemory;

//agrupa todos os testes
describe('Create Category', () => {
    beforeEach(() => {
        createReposytoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            createReposytoryInMemory,
        );
    });

    it('should be able create new category', async () => {
        //cria categoria
        const category = {
            name: 'Create test',
            description: 'Category description test',
        };
        //salva categoria
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await createReposytoryInMemory.findByName(
            category.name,
        );
        // verifica se a category foi criada com sucesso, se o id foi criado.
        expect(categoryCreated).toHaveProperty('id');
    });

    it('should not be able to create a new category with de same name', async () => {
        expect(async () => {
            const createCategory = {
                name: 'Create test',
                description: 'Category description test',
            };
            await createCategoryUseCase.execute({
                name: createCategory.name,
                description: createCategory.description,
            });
            // tenta salvar a categoria com mesmo nome
            await createCategoryUseCase.execute({
                name: createCategory.name,
                description: createCategory.description,
            });
        }).rejects.toBeInstanceOf(AppErros);
    });
});
