import { Router } from 'express';
import CreateSpecificationController from '../modules/cars/useCase/createSpecification/CreateSpecificationController';

const specification = Router();

const createSpecification = new CreateSpecificationController();

specification.post('', createSpecification.handle);

export default specification;
