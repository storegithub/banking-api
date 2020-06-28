import { IService, BaseService } from "src/generics/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { Injectable } from "@nestjs/common";
import { ContactDto } from "src/models/contact.dto";
import { Contact } from "src/entities/contact.entity";

export interface IContactService extends IService<ContactDto>
{

}

@Injectable()
export class ContactService extends BaseService<Contact, ContactDto> implements IContactService
{
    constructor(@InjectRepository(Contact) repository: Repository<Contact>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }


    
    public MapDto(entity: Contact): ContactDto
    {
        return this.mapper.map(entity, ContactDto, Contact);
    }

    public MapEntity(dto: ContactDto): Contact
    {
        return this.mapper.map(dto, Contact, ContactDto);
    }

    public MapDtos(entities: Array<Contact>): Array<ContactDto>
    {
        return this.mapper.mapArray(entities, ContactDto, Contact);
    }

    public MapEntities(dtos: Array<ContactDto>): Array<Contact>
    {
        return this.mapper.mapArray(dtos, Contact, ContactDto);
    }

    public onBeforeInsert(dto: ContactDto): Contact
    {
        const value: Contact = this.mapper.map(dto, Contact, ContactDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: Contact): ContactDto
    {
        return this.MapDto(entity);
    }
}