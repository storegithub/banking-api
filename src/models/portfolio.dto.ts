import { AccountDto } from "./account.dto";
import { SelectItem } from "./selectitem";

export class PortfolioDto
{
    public currentAccounts: AccountDto[] = [];
    public economies: AccountDto[] = [];
    public deposits: AccountDto[] = [];
    public dues: AccountDto[] = [];

    public amount: number;
}