// import { createConnection, getConnectionOptions } from 'typeorm';

// interface IOptions {
//     host: string;
// }

// export default getConnectionOptions().then(options => {
//     const newOptions = options as IOptions;
//     newOptions.host = '192.168.99.100';

//     createConnection({
//         ...options,
//     });
// });
//import { Connection, createConnection, getConnectionOptions } from 'typeorm';
// export default async (host: '192.168.99.100'): Promise<Connection> => {
//     const defaultOptions = await getConnectionOptions();
//     return createConnection(
//         Object.assign(defaultOptions, {
//             host,
//         }),
//     );
// };

import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = '192.168.99.100'): Promise<Connection> => {
    const connectionOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(connectionOptions, {
            host: process.env.NODE_ENV === 'test' ? '192.168.99.100' : host,
            database:
                process.env.NODE_ENV === 'test'
                    ? 'rentex_test'
                    : connectionOptions.database,
        }),
    );
};
