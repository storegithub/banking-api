import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IId } from "src/generics/id.interface";
import { Account } from "./account.entity";
 
@Entity()
export class AccountType implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    @Column({ name: 'Code' })
    public code: string;

    @Column({ name: 'Name' })
    public name: string;
    
    @Column({ name: 'Details' })
    public details: string;

    @OneToMany(type => Account, photo => photo.accountType)
    public accounts: Account[];
}