import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Branch } from "src/entities/branch.entity";
import { BranchType } from "src/entities/branchtype.entity";
import { BranchController } from "./branch.controller";
import { BranchService } from "./Branch.service";
import { BranchTypeService } from "./branchType.service";

@Module({
    imports: [TypeOrmModule.forFeature([Branch, BranchType])],
    controllers:[
        BranchController
    ],
    providers: [
        { provide: "IBranchService", useClass: BranchService }, 
        { provide: "IBranchTypeService", useClass: BranchTypeService }
    ],
    exports: [
        { provide: "IBranchService", useClass: BranchService }, 
        { provide: "IBranchTypeService", useClass: BranchTypeService }
    ]
})
export class BranchModule{}