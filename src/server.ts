import express from 'express';
import swaggerUI from 'swagger-ui-express';
import './database';
import router from './routes';
import swaggerJson from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use(router);

app.listen(3333, () => {
    console.log('Server is running on port:3333');
});

export default app;
