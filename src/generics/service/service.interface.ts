import { OperationResult } from "src/models/operation.result.dto";

export interface IService<T extends object>
{
    getById(id: number): Promise<T>;

    getAll(): Promise<Array<T>>;

    filter(filter: object): Promise<Array<T>>;
    insert(dto: T): Promise<OperationResult<T>>;
    update(dto: T): Promise<OperationResult<T>>;
    delete(dto: T): Promise<OperationResult<T>>;
}