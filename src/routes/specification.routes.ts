import { Router } from 'express';
import createSpecificationController from '../modules/cars/useCase/createSpecification';

const specification = Router();

specification.post('', (request, response) => {
    return createSpecificationController.handle(request, response);
});

specification.get('', (request, response) => {
    return createSpecificationController.handle(request, response);
});

export default specification;
