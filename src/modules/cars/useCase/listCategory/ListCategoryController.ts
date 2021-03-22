import { Request, Response } from 'express';
import ListCategoryUseCase from './ListCategoryUseCase';

class ListCategoryController {
    constructor(private listCategoryUseCase: ListCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const allCategory = this.listCategoryUseCase.execute();

        return response.status(200).json(allCategory);
    }
}

export default ListCategoryController;
