import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import createConnection from '../index';

async function create() {
    const connection = await createConnection('192.168.99.100');

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
        ` INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
          values('${id}','admin', 'admin@rentx', '${password}', true, 'now()','xxxzz')`,
    );

    await connection.close;
}

create().then(() => console.log('user created'));
