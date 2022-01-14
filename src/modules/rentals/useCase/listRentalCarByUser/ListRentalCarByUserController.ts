import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListRentalCarByUserUseCase from './ListRentalCarByUserUseCase';

class ListeRentalCarByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalCarByUserUseCase = container.resolve(
            ListRentalCarByUserUseCase,
        );

        const rental = await listRentalCarByUserUseCase.execute(id);

        return response.json(rental);
    }
}
export default ListeRentalCarByUserController;
