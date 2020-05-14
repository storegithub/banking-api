import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from "typeorm";
import { AutoMap, ignore } from "nestjsx-automapper";
import { IId } from "src/generics/id.interface";

@Entity()
export class User  implements IId
{    
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    @Column({ name: 'CustomerId' })
    public customerId: number;

    @Column({ name: 'UserName' })
    public userName: string;

    @Column({ name: 'Email' })
    public email: string;
    
    @Column({ name:'Password' })
    public password: string;  
    
    @Column({ name: 'Active' })
    public active: boolean;
}