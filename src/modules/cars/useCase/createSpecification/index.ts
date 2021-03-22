import SpecificationRepository from '../../repositories/implementations/SpecificationRepository';
import CreateSpecificationController from './CreateSpecificationController';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

const specificationRepository = SpecificationRepository.getInstanceSpecification();
const createSpecificationUsecase = new CreateSpecificationUseCase(
    specificationRepository,
);
const createSpecificationController = new CreateSpecificationController(
    createSpecificationUsecase,
);

export default createSpecificationController;
