import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { IId } from "src/generics/id.interface";
import { Branch } from "./branch.entity";
 
@Entity()
export class Bank implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;
    
    @Column({ name: 'Details' })
    public details: string;

    @OneToMany(type => Branch, a => a.bank)
    public branches: Branch[];
}