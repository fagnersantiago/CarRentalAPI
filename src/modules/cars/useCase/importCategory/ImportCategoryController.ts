import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ImportCategoryUseCase from './ImportCategoryUseCase';

class ImportCategoryController {
    handle(request: Request, response: Response): Response {
        const { file } = request;

        const importCategory = container.resolve(ImportCategoryUseCase);

        importCategory.execute(file);

        return response.json(importCategory);
    }
}

export default ImportCategoryController;
