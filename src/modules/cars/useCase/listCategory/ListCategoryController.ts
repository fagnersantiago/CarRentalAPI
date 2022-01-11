import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListCategoryUseCase from './ListCategoryUseCase';

class ListCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const lisAllCategory = container.resolve(ListCategoryUseCase);

        const all = await lisAllCategory.execute();

        return response.status(200).json(all);
    }
}

export default ListCategoryController;
