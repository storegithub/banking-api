import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { IId } from "src/generics/id.interface";
 
@Entity()
export class Branch implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    
    @Column({ name: 'BankId' })
    public bankId: number;
    
    
    @Column({ name: 'AddressId' })
    public addressId: number;

    
    @Column({ name: 'Code' })
    public code: string;

    
    @Column({ name: 'Details' })
    public details: string;
}