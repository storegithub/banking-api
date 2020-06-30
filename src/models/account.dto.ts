import { SelectItem } from "./selectitem";

export class AccountDto
{
    public id?: number;
    public customerId?: number;
    public accountNumber?: string;
    public accountType: string;
    public currency: string;
    public currencyValue: string;
    public amount: number;
    public displayName: string;
    public iban: string;

    public userId: number;

    public currencies: SelectItem<string, string>[] = [];
    public accountTypes: SelectItem<string, string>[] = [];
}