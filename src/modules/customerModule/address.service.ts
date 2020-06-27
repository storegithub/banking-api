
import { IService, BaseService} from "../../generics/service/base.service";
import { Address } from "src/entities/Address.entity";
import { AddressDto } from "src/models/Address.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "nestjsx-automapper/dist/decorators";
import { AutoMapper } from "nestjsx-automapper";

export interface IAddressService extends IService<AddressDto>
{

}


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
        const user: Address = this.mapper.map(dto, Address, AddressDto);
        user.id = 0;

        return user;
    }

    public onAfterInsert(entity: Address): AddressDto
    {
        return this.MapDto(entity);
    }
}