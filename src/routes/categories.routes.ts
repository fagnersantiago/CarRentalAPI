import { Router } from 'express';
import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoryServices from '../services/CreateCategory';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('', (request, response) => {
    const { name, description } = request.body;

    const createCategoryRepository = new CreateCategoryServices(
        categoriesRepository,
    );

    createCategoryRepository.execute({ name, description });

    return response.status(201).json(createCategoryRepository);
});

categoriesRoutes.get('', (request, response) => {
    const allCategory = categoriesRepository.list();

    return response.status(200).json(allCategory);
});

export default categoriesRoutes;
