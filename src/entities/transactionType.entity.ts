import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IId } from "src/generics/id.interface";
import { Transaction } from "./transaction.entity";

@Entity()
export class TransactionType implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    
    @Column({ name: 'Details' })
    public details: string;

    @OneToMany(() => Transaction, item => item.transactionType)
    public transactions: Transaction[];
}