import { IService, BaseService } from "src/generics/service/base.service";
import { AddressDto } from "src/models/Address.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "src/entities/address.entity";
import { Repository } from "typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper";
import { Injectable } from "@nestjs/common";

export interface IAddressService extends IService<AddressDto>
{

}

@Injectable()
export class AddressService extends BaseService<Address, AddressDto> implements IAddressService
{
    constructor(@InjectRepository(Address) repository: Repository<Address>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }


    
    public MapDto(entity: Address): AddressDto
    {
        return this.mapper.map(entity, AddressDto, Address);
    }

    public MapEntity(dto: AddressDto): Address
    {
        return this.mapper.map(dto, Address, AddressDto);
    }

    public MapDtos(entities: Array<Address>): Array<AddressDto>
    {
        return this.mapper.mapArray(entities, AddressDto, Address);
    }

    public MapEntities(dtos: Array<AddressDto>): Array<Address>
    {
        return this.mapper.mapArray(dtos, Address, AddressDto);
    }

    public onBeforeInsert(dto: AddressDto): Address
    {
        const value: Address = this.mapper.map(dto, Address, AddressDto);
        value.id = 0;

        return value;
    }

    public onAfterInsert(entity: Address): AddressDto
    {
        return this.MapDto(entity);
    }
}