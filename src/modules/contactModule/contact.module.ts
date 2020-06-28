import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contact } from "src/entities/contact.entity";
import { ContactService } from "./contact.service";
import { ContactController } from "./contact.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Contact])],
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