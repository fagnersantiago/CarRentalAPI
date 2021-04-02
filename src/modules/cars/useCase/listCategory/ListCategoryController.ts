import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCategoryUseCase from './ListCategoryUseCase';

class ListCategoryController {
    handle(request: Request, response: Response): Response {
        const allCategory = container.resolve(ListCategoryUseCase);

        allCategory.execute();

        return response.status(200).json(allCategory);
    }
}

export default ListCategoryController;
