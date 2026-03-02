import { IMalProvider } from '../models/IMalProvider';
declare class MalProviderInMemory implements IMalProvider {
    private messages;
    sendMail(to: string, subject: string, body: string): Promise<void>;
}
export { MalProviderInMemory };
//# sourceMappingURL=MalProviderInMemory.d.ts.map