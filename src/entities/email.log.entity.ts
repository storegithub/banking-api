import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { IId } from "src/generics/id.interface";
 
@Entity()
export class EmailLog implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    
    @Column({ name: 'Guid' })
    public guid: string;

    @Column({ name: 'Code' })
    public code: string;

    @Column({ name: 'CreatedOn' })
    public createdOn: Date;
}