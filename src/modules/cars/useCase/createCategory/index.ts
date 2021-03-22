import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';
import CreateCategoryController from './CreateCategoryController';
import CreateCategoryUseCase from './CreateCategoryUseCase';

export const categoryRepository = CategoriesRepository.getInstance();
export const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
);
export const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
);
