import { Router } from 'express';
import CreateCategoryController from '../modules/cars/useCase/createCategory/CreateCategoryController';
import ListCategoryController from '../modules/cars/useCase/listCategory/ListCategoryController';

import multer from 'multer';
import ImportCategoryController from '../modules/cars/useCase/importCategory/ImportCategoryController';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoriesController = new CreateCategoryController();
const importCategoriesController = new ImportCategoryController();
const listCategoriesController = new ListCategoryController();

categoriesRoutes.post('', createCategoriesController.handle);
console.log('funcionando');

categoriesRoutes.get('', listCategoriesController.handle);

categoriesRoutes.post(
    '/import',
    upload.single('file'),
    importCategoriesController.handle,
);

export default categoriesRoutes;
