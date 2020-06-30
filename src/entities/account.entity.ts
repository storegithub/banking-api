import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { IId } from "src/generics/id.interface";
import { AccountType } from "./accountType.entity";
import { DictionaryDetail } from "./dictionaryDetail.entity";
import { Transaction } from "./transaction.entity";

@Entity()
export class Account implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    @Column({ name: 'CustomerId' })
    public customerId: number;

    @Column({ name: 'AccountNumber' })
    public accountNumber: string;
    
    @Column({ name: 'iban' })
    public iban: string;

    @Column({ name: 'Amount' })
    public amount: number;

    @Column({ name: 'DisplayName' })
    public displayName: string;


    @OneToMany(() => Transaction, item => item.fromAccount)
    public transactions: Transaction[];


    @ManyToOne(type => AccountType, item => item.accounts)
    public accountType: AccountType;

    @ManyToOne(type => DictionaryDetail, item => item.accounts)
    public currency: DictionaryDetail;
}