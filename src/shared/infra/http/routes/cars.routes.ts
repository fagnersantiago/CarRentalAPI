import { Router } from 'express';
import CreateCarController from '../../../../modules/cars/useCase/createCar/CreateCarController';
import { ensureAdmin } from '../../../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticate';
import ListAvailableCarController from '../../../../modules/cars/useCase/listAvailableCar/ListAvailableCarController';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
carRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);
carRoutes.get('/available', listAvailableCarController.handle);
export default carRoutes;
