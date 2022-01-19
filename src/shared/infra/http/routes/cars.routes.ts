import { Router } from 'express';
import multer from 'multer';
import CreateCarController from '../../../../modules/cars/useCase/createCar/CreateCarController';
import { ensureAdmin } from '../../../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticate';
import ListAvailableCarController from '../../../../modules/cars/useCase/listAvailableCar/ListAvailableCarController';
import CreateSpecificationController from '../../../../modules/cars/useCase/createSpecification/CreateSpecificationController';
import UploadCarImageController from '../../../../modules/cars/useCase/uploadCarImagesUseCase/UploadCarImageController';
import upload from '../../../../config/upload';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createCarSpecificationController = new CreateSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

const uploadImage = multer(upload);

carRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);
carRoutes.get('/available', listAvailableCarController.handle);
carRoutes.post(
    '/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle,
);

carRoutes.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    uploadImage.array('images'),
    uploadCarImagesController.handle,
);

export default carRoutes;
