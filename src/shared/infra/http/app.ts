import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import '../typeorm';
import '../../container';
import createConnection from '../typeorm/index';
import router from './routes';
import swaggerJson from '../../../swagger.json';
import { AppErros } from '../../errors/AppErrors';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppErros) {
            return response.status(Number(err.statusCode)).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: `internal error - ${err.message}`,
        });
    },
);

export default app;
