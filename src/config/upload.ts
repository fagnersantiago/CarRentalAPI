import crypto from 'crypto';
import multer from 'multer';

import { resolve } from 'path';

export default {
    upload(folder: string) {
        return {
            //storage File on diskStorage
            storage: multer.diskStorage({
                // setting file destination
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    // parse file name to hash
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
        };
    },
};
