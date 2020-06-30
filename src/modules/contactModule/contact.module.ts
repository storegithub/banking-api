import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contact } from "src/entities/contact.entity";
import { ContactService } from "./contact.service";
import { ContactController } from "./contact.controller";
import { AuthModule } from "../authModule/auth.module";
import { PassportModule } from "@nestjs/passport";
import { SharedModule } from "../shared/shared.module";

@Module({
    imports: [TypeOrmModule.forFeature([Contact]), PassportModule, SharedModule],
    controllers:[
        ContactController
    ],
    providers: [
        { provide: "IContactService", useClass: ContactService }
    ],
    exports: [
        { provide: "IContactService", useClass: ContactService }
    ]
})
export class ContactModule{}