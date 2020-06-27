import { BaseService } from "../service/base.service";
import { IService } from "../service/base.service";
import { Get, Param } from "@nestjs/common";

export class BaseController<T extends object>
{
    protected readonly service: IService<T>;

    constructor(service: IService<T>)
    {
        this.service = service;
    }

    @Get()
    public getAll(): Promise<Array<T>>
    {
        return this.service.getAll();
    }

    @Get(':id')
    public getById(@Param('id') id: number): Promise<T>
    {
        return this.service.getById(id);
    }
}