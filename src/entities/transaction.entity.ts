import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { IId } from "src/generics/id.interface";
 
@Entity()
export class Transaction implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    
    @Column({ name: 'MercantId' })
    public mercantId: number;

    
    @Column({ name: 'TransactionTypeId' })
    public transactionTypeId: number;

    
    @Column({ name: 'AccountNumber' })
    public accountNumber: string;

    
    @Column({ name: 'TransactionDate' })
    public transactionDate: Date;

    
    @Column({ name: 'Amount' })
    public Amount: number;

    
    @Column({ name: 'Details' })
    public details: Date;
}