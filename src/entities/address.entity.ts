import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { IId } from "src/generics/id.interface";
 
@Entity()
export class Address implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    
    @Column({ name: 'City' })
    public city: string;

    
    @Column({ name: 'ZipCode' })
    public zipCode: string;

    
    @Column({ name: 'Details' })
    public details: string;
}