import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IId } from "src/generics/id.interface";
import { Account } from "./account.entity";
import { Transaction } from "./transaction.entity";
 
@Entity()
export class DictionaryDetail implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    
    @Column({ name: 'DictionaryId' })
    public dictionaryId: number;

    
    @Column({ name: 'Name' })
    public name: string;

    
    @Column({ name: 'Value' })
    public value: string;

    
    @Column({ name: 'Active' })
    public active: boolean;

    @OneToMany(type => Account, a => a.currency)
    public accounts: Account[];

    @OneToMany(type => Transaction, a => a.currency)
    public transactions: Transaction[];
}