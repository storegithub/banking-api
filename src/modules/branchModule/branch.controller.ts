import { BaseController } from "src/generics/controller/base.controller";
import { Inject, Controller } from "@nestjs/common";
import { BranchDto } from "src/models/branch.dto";
import { IBranchTypeService } from "./branchType.service";
import { IBranchService } from "./Branch.service";

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