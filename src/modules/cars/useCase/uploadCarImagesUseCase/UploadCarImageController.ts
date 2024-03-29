import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadCarImageUseCase from './UploadCarImageUseCase';

// interface IFiles {
//     fileName: string;
// }

class UploadCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as Express.Multer.File[];

        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

        const images_name = images.map(file => file.filename);
        await uploadCarImageUseCase.execute({
            car_id: id,
            images_name,
        });

        return response.status(201).send();
    }
}

export default UploadCarImageController;
