import { Router } from 'express';
import SpecificationRepository from '../modules/cars/repositories/SpecificationRepository';
import SpecificationServices from '../modules/cars/services/CreateSpecification';

const specification = Router();

const specifications = new SpecificationRepository();

specification.post('', (request, response) => {
    const { name, description } = request.body;

    const specificationsRepository = new SpecificationServices(specifications);

    specificationsRepository.execute({ name, description });

    return response.status(200).json(specificationsRepository);
});

export default specification;
