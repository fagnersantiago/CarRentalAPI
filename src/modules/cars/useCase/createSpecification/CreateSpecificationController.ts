import { Request, Response } from 'express';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

class CreateSpecificationController {
    constructor(
        private createSpecificationController: CreateSpecificationUseCase,
    ) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        this.createSpecificationController.execute({ name, description });

        return response.status(201).json(this.createSpecificationController);
    }
}

export default CreateSpecificationController;
