import CategoriesRepository from '../../repositories/CategoriesRepository';
import CreateCategoryController from './CreateCategoryController';
import CreateCategoryUseCase from './CreateCategoryUseCase';

export const categoryRepository = new CategoriesRepository();
export const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
);
export const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
);
