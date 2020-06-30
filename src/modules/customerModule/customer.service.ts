import { IService, BaseService } from "src/generics/service/base.service";
import { CustomerDto } from "src/models/customer.dto"; 
import { Injectable } from "@nestjs/common";
import { Customer } from "src/entities/customer.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper, AutoMapper } from "nestjsx-automapper"; 

export interface ICustomerService extends IService<CustomerDto>
{ 
}

@Injectable()
export class CustomerService extends BaseService<Customer, CustomerDto> implements ICustomerService
{
    constructor(@InjectRepository(Customer) repository: Repository<Customer>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }
 

    public async getById(id: number): Promise<CustomerDto>
    {
        let item: CustomerDto = null;
        try
        {
            const entity: Customer = await this.repository.findOne({ where: { id: id }, relations: ["branch", "address"] });

            item = this.MapDto(entity);
        }
        catch(error)
        {
            console.log(error);
        }
        return item;
    }
    
    public MapDto(entity: Customer): CustomerDto
    {
        return this.mapper.map(entity, CustomerDto, Customer);
    }

    public MapEntity(dto: CustomerDto): Customer
    {
        return this.mapper.map(dto, Customer, CustomerDto);
    }

    public MapDtos(entities: Array<Customer>): Array<CustomerDto>
    {
        return this.mapper.mapArray(entities, CustomerDto, Customer);
    }

    public MapEntities(dtos: Array<CustomerDto>): Array<Customer>
    {
        return this.mapper.mapArray(dtos, Customer, CustomerDto);
    }

    public onBeforeInsert(dto: CustomerDto): Customer
    {
        const value: Customer = this.mapper.map(dto, Customer, CustomerDto);
        value.id = 0;

        return value;
    }

    public onBeforeUpdate(dto: CustomerDto): Customer
    {
        const value: Customer = new Customer();
        value.id = dto.id;
        value.details = dto.details;
        value.email = dto.email;
        value.gender = dto.gender;
        value.name = dto.name;
        value.number = dto.number;
        value.phoneNo = dto.phoneNo;
        value.series = dto.series;
        value.surname = dto.surname;
        return value;
    }

    public onAfterInsert(entity: Customer): CustomerDto
    {
        return this.MapDto(entity);
    }

    public onAfterUpdate(entity: Customer): CustomerDto
    {
        return this.MapDto(entity);
    }
}