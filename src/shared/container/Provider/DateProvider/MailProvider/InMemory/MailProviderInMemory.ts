import IMailProvider from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
    private massage: any[] = [];
    async sendMail(
        to: string,
        subject: string,
        variable: any,
        path: string,
    ): Promise<void> {
        this.massage.push({
            to,
            subject,
            variable,
            path,
        });
    }
}

export default MailProviderInMemory;
