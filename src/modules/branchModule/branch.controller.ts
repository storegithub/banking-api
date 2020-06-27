import { BaseController } from "src/generics/controller/base.controller";
import { BranchDto } from "src/models/Branch.dto";
import { Inject } from "@nestjs/common";
import { IBranchService } from "./Branch.service";

export class BranchController extends BaseController<BranchDto>
{

    constructor(@Inject('IBranchService') BranchService: IBranchService)
    {
        super(BranchService);
    }

    
}