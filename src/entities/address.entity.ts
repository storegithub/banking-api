import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IId } from "src/generics/id.interface";
import { Branch } from "./branch.entity";
import { Customer } from "./customer.entity";
 
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

    @OneToMany(type => Branch, a => a.address)
    public branches: Branch[];

    @OneToMany(type => Customer, a => a.address)
    public customers: Customer[];
}