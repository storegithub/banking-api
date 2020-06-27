import { BaseService } from "src/generics/service/base.service";
import { User } from "src/entities/user.entity";
import { UserDto } from "src/models/user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IService } from "src/generics/service/base.service";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { Injectable, BadRequestException } from "@nestjs/common";
import { isNullOrUndefined } from "util";

export interface IUserService extends IService<UserDto> 
{
    findOne(userName: string): Promise<UserDto>;
    findActiveOne(userName: string): Promise<UserDto>;
}

@Injectable()
export class UserService extends BaseService<User, UserDto> implements IUserService
{
    constructor(@InjectRepository(User) repository: Repository<User>, @InjectMapper() mapper: AutoMapper)
    {
        super(repository, mapper);
    }

    public async findOne(userName: string): Promise<UserDto>
    {
        if (isNullOrUndefined(userName))
            throw new BadRequestException("Invalid credentials!");

        const result: Array<UserDto> = await this.filter({ userName });
        if(isNullOrUndefined(result) || result.length != 1)
            return null;
        return result[0];
    }

    public async findActiveOne(userName: string): Promise<UserDto>
    {
        if (isNullOrUndefined(userName))
            throw new BadRequestException("Invalid credentials!");

        const result: Array<UserDto> = await this.filter({ userName, active: true });
        if(isNullOrUndefined(result) || result.length != 1)
            return null;
        return result[0];
    }

    public MapDto(entity: User): UserDto
    {
        return this.mapper.map(entity, UserDto, User);
    }

    public MapEntity(dto: UserDto): User
    {
        return this.mapper.map(dto, User, UserDto);
    }

    public MapDtos(entities: Array<User>): Array<UserDto>
    {
        return this.mapper.mapArray(entities, UserDto, User);
    }

    public MapEntities(dtos: Array<UserDto>): Array<User>
    {
        return this.mapper.mapArray(dtos, User, UserDto);
    }

    public onBeforeInsert(dto: UserDto): User
    {
        const user: User = this.mapper.map(dto, User, UserDto);
        user.id = 0;

        return user;
    }

    public onAfterInsert(entity: User): UserDto
    {
        return this.MapDto(entity);
    }
}