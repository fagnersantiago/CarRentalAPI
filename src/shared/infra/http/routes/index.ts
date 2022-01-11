import { Router } from 'express';
import authenticateRouter from './authenticate.routes';

import categoriesRoutes from './categories.routes';
import specificationRoutes from './specification.routes';
import usersRoutes from './user.routes';
import carRoutes from './cars.routes';
import rentalRoutes from './rental.routes';

const router = Router();
router.use('/categories', categoriesRoutes);
router.use('/specification', specificationRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carRoutes);
router.use('/rental', rentalRoutes);
router.use(authenticateRouter);
export default router;
