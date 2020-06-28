import { BaseController } from "src/generics/controller/base.controller";
import { Inject, Controller } from "@nestjs/common"; 
import { ContactDto } from "src/models/contact.dto";
import { IContactService } from "./contact.service";
import { ApiResponse } from "src/models/response.class";
import { OperationResult } from "src/models/operation.result.dto";

@Controller('contact')
export class ContactController
{
    private readonly service: IContactService;
    constructor(@Inject("IContactService") service: IContactService)
    {
        this.service = service;
    }


    public async post(item: ContactDto): Promise<ApiResponse>
    {
        const response: OperationResult<ContactDto> = await this.service.insert(item);

        return new ApiResponse(response.success, response.message);
    }
}