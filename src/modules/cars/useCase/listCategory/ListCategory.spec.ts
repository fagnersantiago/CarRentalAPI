import app from '../../../../shared/infra/http/app';
import request from 'supertest';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

let connection: Connection;

describe('List Category', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash('admin', 8);

        await connection.query(
            ` INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
          values('${id}','admin', 'admin@rentx', '${password}', true, 'now()','xxxzz')`,
        );
    });

    afterAll(async () => {
        //await connection.dropDatabase();
        await connection.close();
    });

    it('Should be able list all category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx',
            password: 'admin',
        });
        const { token } = responseToken.body;

        await request(app)
            .post('/categories')
            .send({
                name: 'teste',
                description: 'supertest',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get('/categories');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toBe('id');
        expect(response.body[0].name).toBe('teste');
    });
});
