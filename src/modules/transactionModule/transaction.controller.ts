import { BaseController } from "src/generics/controller/base.controller";
import { Inject, Controller, Post, Body } from "@nestjs/common";
import { TransactionDto } from "src/models/transaction.dto";
import { ITransactionTypeService } from "./transactionType.service";
import { ITransactionService } from "./transaction.service";
import { Transaction } from "src/entities/transaction.entity";
import { ApiResponse } from "src/models/response.class";

@Controller('transaction')
export class TransactionController extends BaseController<TransactionDto>
{

    private readonly transactionTypeService: ITransactionTypeService;
    private readonly transactionService: ITransactionService;

    constructor(@Inject('ITransactionService') transactionService: ITransactionService, 
                @Inject('ITransactionTypeService') transactionTypeService: ITransactionTypeService)
    {
        super(transactionService);
        this.transactionService = transactionService;
        this.transactionTypeService = transactionTypeService;
    }

    @Post()
    public async addTransaction(@Body() item: TransactionDto): Promise<ApiResponse>
    {
        try
        {
            const result: TransactionDto = await this.transactionService.addTransaction(item);
            if(result == null) throw new Error();

            return new ApiResponse(true, "Tranzactie efectuata cu succes!");
        }
        catch(err)
        {
            return new ApiResponse(false, err.message);
        }
    }
    
}