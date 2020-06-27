
import { IService, BaseService} from "../../generics/service/base.service";
import { Customer } from "src/entities/customer.entity";
import { CustomerDto } from "src/models/customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectMapper } from "nestjsx-automapper/dist/decorators";
import { AutoMapper } from "nestjsx-automapper";

export interface ICustomerService extends IService<CustomerDto>
{

}


export class CustomerService extends BaseService<Customer, CustomerDto> implements ICustomerService
{
    constructor(@InjectRepository(Customer) repository: Repository<Customer>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
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
        const user: Customer = this.mapper.map(dto, Customer, CustomerDto);
        user.id = 0;

        return user;
    }

    public onAfterInsert(entity: Customer): CustomerDto
    {
        return this.MapDto(entity);
    }
}