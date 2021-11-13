import { Router } from 'express';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticate';
import CreateSpecificationController from '../../../../modules/cars/useCase/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '../../../middlewares/ensureAdmin';

const specification = Router();

const createSpecification = new CreateSpecificationController();

specification.post(
    '',
    ensureAuthenticated,
    ensureAdmin,
    createSpecification.handle,
);

export default specification;
