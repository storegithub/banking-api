export class TransactionDto
{
    public id?: number;
    public mercant: string;
    public transactionTypeId: number;
    public transactionType: string;
    public accountNumber: string;
    public transactionDate: Date;
    public Amount: number;
    public details: string;

    public fromAccount: string;
    public fromAccountId: number;

}