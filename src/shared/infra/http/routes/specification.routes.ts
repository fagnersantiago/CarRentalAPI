import { Router } from 'express';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticate';
import CreateSpecificationController from '../../../../modules/cars/useCase/createSpecification/CreateSpecificationController';

const specification = Router();

const createSpecification = new CreateSpecificationController();

specification.use(ensureAuthenticated);
specification.post('', createSpecification.handle);

export default specification;
