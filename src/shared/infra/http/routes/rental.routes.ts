import { Router } from 'express';
import CreateRentalController from '../../../../modules/rentals/useCase/createRental/CreateRentalController';
import DevolutionRentalController from '../../../../modules/rentals/useCase/devolutionRental/CreateDevolutionController';
import ListeRentalCarByUserController from '../../../../modules/rentals/useCase/listRentalCarByUser/ListRentalCarByUserController';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticate';

const rentalRoutes = Router();

const createRentaController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUseController = new ListeRentalCarByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentaController.handle);
rentalRoutes.post(
    '/devolution/:id',
    ensureAuthenticated,
    devolutionRentalController.handle,
);

rentalRoutes.get(
    '/user',
    ensureAuthenticated,
    listRentalByUseController.handle,
);
export default rentalRoutes;
