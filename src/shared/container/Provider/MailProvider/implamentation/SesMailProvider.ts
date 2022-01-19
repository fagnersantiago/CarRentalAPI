import { injectable } from 'tsyringe';
import { SES } from 'aws-sdk';
import IMailProvider from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class SesMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_BUCKET_REGION,
            }),
        });
    }
    async sendMail(
        to: string,
        subject: string,
        variable: any,
        path: string,
    ): Promise<void> {
        const templatefileContent = fs.readFileSync(path).toString('utf-8');

        const templateParse = handlebars.compile(templatefileContent);

        const templateHtml = templateParse(variable);

        await this.client.sendMail({
            to,
            from: 'Rentx  <noreplay@rentx.com.br>', //passar o email válido na aws
            subject,
            html: templateHtml,
        });
    }
}

export default SesMailProvider;
