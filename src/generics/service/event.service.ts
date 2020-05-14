import { IId } from "../id.interface";
import { AutoMapper } from "nestjsx-automapper";

export class EventService<Tentity extends object & IId, Tdto extends object>
{
    protected readonly mapper: AutoMapper;

    constructor(mapper: AutoMapper)
    {
        this.mapper = mapper;
    }

    public onBeforeInsert(dto: Tdto): Tentity
    {
        return null;
    }

    public onAfterInsert(entity: Tentity): Tdto
    {
        return null;
    }

    public onBeforeUpdate(entity: Tdto): Tentity
    {
        return null;
    }

    public onAfterUpdate(entity: Tentity): Tdto
    {
        return null;
    }

    public onBeforeDelete(dto: Tdto): Tentity
    {
        return null;
    }

    public MapEntity(dto: Tdto): Tentity
    {
        return null;
    }

    public MapEntities(dtos: Array<Tdto>): Array<Tentity>
    {
        return [];
    }

    public MapDto(entity: Tentity): Tdto
    {
        return null;
    }

    public MapDtos(entities: Array<Tentity>): Array<Tdto>
    {
        return [];
    }
}