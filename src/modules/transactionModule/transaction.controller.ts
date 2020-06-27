import { BaseController } from "src/generics/controller/base.controller";
import { Inject } from "@nestjs/common";
import { TransactionDto } from "src/models/transaction.dto";
import { ITransactionTypeService } from "./transactionType.service";
import { ITransactionService } from "./transaction.service";

export class TransactionController extends BaseController<TransactionDto>
{

    private readonly transactionTypeService: ITransactionTypeService;

    constructor(@Inject('ITransactionService') transactionService: ITransactionService, 
                @Inject('ITransactionTypeService') transactionTypeService: ITransactionTypeService)
    {
        super(transactionService);
        this.transactionTypeService = transactionTypeService;
    }

    
}