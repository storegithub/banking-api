import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { IId } from "src/generics/id.interface";
import { Bank } from "./bank.entity";
import { Address } from "./address.entity";
import { Customer } from "./customer.entity";
 
@Entity()
export class Branch implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;
         
    @Column({ name: 'Code' })
    public code: string;

    @Column({ name: 'TypeId'})
    public typeId: number;

    
    @Column({ name: 'Details' })
    public details: string;

    @OneToMany(type => Bank, item => item.branches)
    public bank: Bank;

    @ManyToOne(type => Address, item => item.branches)
    public address: Address;

    @OneToMany(type => Customer, item => item.branch)
    public customers: Customer[];
}