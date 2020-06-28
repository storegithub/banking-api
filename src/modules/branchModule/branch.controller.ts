import { BaseController } from "src/generics/controller/base.controller";
import { BranchDto } from "src/models/Branch.dto";
import { Inject, Controller } from "@nestjs/common";
import { IBranchService } from "./Branch.service";
import { IBranchTypeService } from "./branchType.service";

@Controller('branch')
export class BranchController extends BaseController<BranchDto>
{

    private readonly branchTypeService: IBranchTypeService;

    constructor(@Inject('IBranchService') branchService: IBranchService, 
                @Inject('IBranchTypeService') branchTypeService: IBranchTypeService)
    {
        super(branchService);
        this.branchTypeService = branchTypeService;
    }

    
}