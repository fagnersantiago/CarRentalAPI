import { Router } from 'express';
import CreateCategoryController from '../../../../modules/cars/useCase/createCategory/CreateCategoryController';
import ListCategoryController from '../../../../modules/cars/useCase/listCategory/ListCategoryController';

import multer from 'multer';
import ImportCategoryController from '../../../../modules/cars/useCase/importCategory/ImportCategoryController';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticate';
import { ensureAdmin } from '../../../middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoriesController = new CreateCategoryController();
const importCategoriesController = new ImportCategoryController();
const listCategoriesController = new ListCategoryController();

categoriesRoutes.post(
    '',
    ensureAuthenticated,
    ensureAdmin,
    createCategoriesController.handle,
);

categoriesRoutes.get('', listCategoriesController.handle);

categoriesRoutes.post(
    '/import',

    upload.single('file'),
    ensureAuthenticated,
    ensureAdmin,
    importCategoriesController.handle,
);

export default categoriesRoutes;
