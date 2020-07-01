export class TransactionDto
{
    public id?: number;
    public partner: string;
    public transactionTypeId: number;
    public transactionType: string;
    public accountNumber: string;
    public transactionDate: Date;
    public amount: number;
    public description: string;

    public fromAccount: string;
    public fromAccountNumber: string;
    public fromAccountId: number;

    public currency: string;

}