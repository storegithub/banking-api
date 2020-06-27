import { Module } from "@nestjs/common";
import { BranchService } from "./Branch.service";
import { BranchController } from "./Branch.controller";
import { Branch } from "src/entities/Branch.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BranchType } from "src/entities/branchtype.entity";
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