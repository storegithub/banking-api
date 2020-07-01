import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { IId } from "src/generics/id.interface";
import { TransactionType } from "./transactionType.entity";
import { Account } from "./account.entity";
import { DictionaryDetail } from "./dictionaryDetail.entity";
 
@Entity()
export class Transaction implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    
    @Column({ name: 'Mercant' })
    public mercant: string;
    
    @Column({ name: 'AccountNumber' })
    public accountNumber: string;

    
    @Column({ name: 'TransactionDate' })
    public transactionDate: Date;

    
    @Column({ name: 'Amount' })
    public amount: number;

    
    @Column({ name: 'Details' })
    public details: string;


    @ManyToOne(type => Account, item => item.transactions)
    public fromAccount: Account;

    @ManyToOne(type => TransactionType, item => item.transactions)
    public transactionType: TransactionType;

    @ManyToOne(type => DictionaryDetail, item => item.transactions)
    public currency: DictionaryDetail;
}