import { Router } from 'express';
import CategoriesRepository from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCase/createCategory';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();
categoriesRoutes.post('', (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get('', (request, response) => {
    const allCategory = categoriesRepository.list();

    return response.status(200).json(allCategory);
});

export default categoriesRoutes;
