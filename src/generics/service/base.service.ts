
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { OperationResult } from 'src/models/operation.result.dto';
import { IId } from '../id.interface';
import { EventService } from './event.service';
import { AutoMapper } from 'nestjsx-automapper';

export interface IService<T extends object>
{
    getById(id: number): Promise<T>;

    getAll(): Promise<Array<T>>;

    filter(filter: object): Promise<Array<T>>;
    insert(dto: T): Promise<OperationResult<T>>;
    update(dto: T): Promise<OperationResult<T>>;
    delete(dto: T): Promise<OperationResult<T>>;
}

export class BaseService<Tentity extends object & IId, Tdto extends object> extends EventService<Tentity, Tdto> implements IService<Tdto> {

    protected readonly repository: Repository<Tentity>;
    
   
    constructor(repository: Repository<Tentity>, mapper: AutoMapper)
    {
        super(mapper);
        this.repository = repository;
    }

    public async getById(id: number): Promise<Tdto>
    {
        let item: Tdto = null;
        try
        {
            const entity: Tentity = await this.repository.findOne(id);

            item = this.MapDto(entity);
        }
        catch(error)
        {
            console.log(error);
        }
        return item;
    }

    public async getAll(): Promise<Array<Tdto>>
    {
        let items: Array<Tdto> = [];
        try
        {
            let entities: Array<Tentity> = await this.repository.find();

            items = this.MapDtos(entities);
        }
        catch(error)
        {
            console.log(error);
        }
        return items;
    }

    public async filter(filter: object): Promise<Array<Tdto>>
    {
        let items: Array<Tdto> = [];
        try
        {
            let entities: Array<Tentity> = await this.repository.find(filter);
            items = this.MapDtos(entities);
        }
        catch(error)
        {
            console.log(error);
        }
        return items;
    }
   

    public async insert(dto: Tdto): Promise<OperationResult<Tdto>>
    {
        let response: OperationResult<Tdto> = new OperationResult<Tdto>();
        try
        {
            const entity: Tentity = this.onBeforeInsert(dto);

            const result: InsertResult = await this.repository.insert(entity);

            entity.id = result.raw.id;
            
            response.data = this.onAfterInsert(entity);
            response.success = true;
        }
        catch(error)
        {
            response.message = error.message;
        }
        return response;
    }

    public async update(dto: Tdto): Promise<OperationResult<Tdto>>
    {
        let response: OperationResult<Tdto> = new OperationResult<Tdto>();
        try
        {
            const entity: Tentity = this.onBeforeUpdate(dto);

            const result: UpdateResult = await this.repository.update(entity.id ,entity);
            if (result.affected < 1)
                throw new Error("Error on update. Please repeat the operation!");

            response.data = this.onAfterUpdate(entity);
            response.success = true;
        }
        catch(error)
        {
            response.message = error.message;
        }
        return response;
    }

    public async delete(dto: Tdto): Promise<OperationResult<Tdto>>
    {
        let response: OperationResult<Tdto> = new OperationResult<Tdto>();
        try
        {
            const entity: Tentity = this.onBeforeDelete(dto);

            const result: DeleteResult = await this.repository.delete(entity.id);
            if (result.affected < 1)
                throw new Error("Error on update. Please repeat the operation!");

            response.success = true;
        }
        catch(error)
        {
            response.message = error.message;
        }
        return response;
    }
}
