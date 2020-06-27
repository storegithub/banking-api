import { Module } from "@nestjs/common";
import { DictionaryService } from "./dictionary.service";
import { DictionaryDetailService } from "./dictionaryDetail.service";
import { DictionaryController } from "./dictionary.controller";
import { Dictionary } from "src/entities/dictionary.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DictionaryDetail } from "src/entities/dictionaryDetail.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Dictionary, DictionaryDetail])],
    controllers:[
        DictionaryController
    ],
    providers: [
        { provide: "IDictionaryService", useClass: DictionaryService }, 
        { provide: "IDictionaryDetailService", useClass: DictionaryDetailService }
    ],
    exports: [
        { provide: "IDictionaryService", useClass: DictionaryService }, 
        { provide: "IDictionaryDetailService", useClass: DictionaryDetailService }
    ]
})
export class DictionaryModule{}