import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DictionaryModule } from "../dictionaryModule/dictionary.module";
import { AboutService } from "./about.service";
import { AboutController } from "./about.controller";


@Module({
    imports: [DictionaryModule],
    controllers:[
        AboutController
    ],
    providers: [
        { provide: "IAboutService", useClass: AboutService }
    ],
    exports: [
        { provide: "IAboutService", useClass: AboutService }
    ]
})
export class AboutModule{}