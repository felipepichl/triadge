import { IMalProvider } from '../models/IMalProvider';
declare class EtherealMailProvider implements IMalProvider {
    private client;
    constructor();
    sendMail(to: string, subject: string, variables: any, path: string): Promise<void>;
}
export { EtherealMailProvider };
//# sourceMappingURL=EtherealMailProvider.d.ts.map