export class IbanService
{
    public newIban(accountNumber: string): string
    {
        return `RO39HMBK${accountNumber}`
    }

    public newAccountNumber(): string{
        let min = 0, max = 9999999999999999;
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
     }
}