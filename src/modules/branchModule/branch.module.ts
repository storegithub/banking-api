import { Module } from "@nestjs/common";
import { BranchService } from "./Branch.service";
import { BranchController } from "./Branch.controller";
import { Branch } from "src/entities/Branch.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([Branch])],
    controllers:[
        BranchController
    ],
    providers: [
        { provide: "IBranchService", useClass: BranchService }
    ],
    exports: [
        { provide: "IBranchService", useClass: BranchService }
    ]
})
export class BranchModule{}