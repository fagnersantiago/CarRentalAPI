import IStorageProvider from '../IStorageProvider';
import { S3 } from 'aws-sdk';
import mime from 'mime';
import { resolve } from 'path';
import upload from '../../../../../config/upload';
import fs from 'fs';

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }
    async save(file: string, folder: string): Promise<string> {
        //updload de Arquivo na WS
        const originalname = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalname);
        const ContentType = mime.getType(originalname);
        // Cria arquivo na aws
        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET_REGION}/${folder}`,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(originalname);

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET_REGION}/${folder}`,
                Key: file,
            })
            .promise();
    }
}

export default S3StorageProvider;
