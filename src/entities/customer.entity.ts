import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { IId } from "src/generics/id.interface";
import { Address } from "./address.entity";
import { Branch } from "./branch.entity";

@Entity()
export class Customer implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;
    
    @Column({ name: 'Gender' })
    public gender: string;

    
    @Column({ name: 'Name' })
    public name: string;

    
    @Column({ name: 'Surname' })
    public surname: string;

    @Column({ name: 'Series' })
    public series: string;

    @Column({ name: 'Number' })
    public number: string;

    
    @Column({ name: 'CreatedOn' })
    public createdOn: Date;

    
    @Column({ name: 'PhoneNo' })
    public phoneNo: string;

    
    @Column({ name: 'Email' })
    public email: string;

    
    @Column({ name: 'Details' })
    public details: string;

    @ManyToOne(type => Branch, item => item.customers)
    public branch: Branch;

    @ManyToOne(type => Address, item => item.customers)
    public address: Address;
}