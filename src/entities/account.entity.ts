import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { IId } from "src/generics/id.interface";

@Entity()
export class Account implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    @Column({ name: 'CustomerId' })
    public customerId: number;

    @Column({ name: 'AccountNumber' })
    public accountNumber: string;
}