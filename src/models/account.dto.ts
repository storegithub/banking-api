import { SelectItem } from "./selectitem";

export class AccountDto
{
    public id?: number;
    public customerId?: number;
    public accountNumber?: string;
    public type: string;
    public currency: string;
    public currencyValue: string;
    public amount: number;
    public displayName: string;
    public iban: string;

    public currencies: SelectItem<string, string>[] = [];
    public accountTypes: SelectItem<string, string>[] = [];
}