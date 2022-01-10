import { Router } from "express";
import CreateRentalController from "../../../../modules/rentals/useCase/createRental/CreateRentalController";
import { ensureAdmin } from "../../../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticate";



const rentalRoutes = Router();

const createRentaController = new CreateRentalController()


rentalRoutes.post("/", ensureAuthenticated, createRentaController.handle)


export default rentalRoutes
