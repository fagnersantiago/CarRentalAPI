import { injectable } from 'tsyringe';
import IMailProvider from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then(account => {
                const trasporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,

                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });

                this.client = trasporter;
            })
            .catch(err => console.error(err));
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

        const message = await this.client.sendMail({
            to,
            from: 'Rentx  <noreplay@rentx.com.br>',
            subject,
            html: templateHtml,
        });

        console.log('Message sent: %s', message.messageID);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;
