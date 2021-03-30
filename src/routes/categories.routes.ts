import { Router } from 'express';
import createCategoryController from '../modules/cars/useCase/createCategory';
import listCategoryController from '../modules/cars/useCase/listCategory';

import multer from 'multer';
import importCategoryController from '../modules/cars/useCase/importCategory';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

categoriesRoutes.post('', (request, response) => {
    console.log('funcionando');
    return createCategoryController().handle(request, response);
});

categoriesRoutes.get('', (request, response) => {
    return listCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export default categoriesRoutes;
