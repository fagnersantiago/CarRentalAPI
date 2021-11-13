import { Router } from 'express';
import CreateCarController from '../../../../modules/cars/useCase/createCar/CreateCarController';
import { ensureAdmin } from '../../../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticate';

const carRoutes = Router();

const createCarController = new CreateCarController();
carRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);

export default carRoutes;
