import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { IId } from "src/generics/id.interface";

@Entity()
export class Customer implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name: 'Id'})
    public id: number;

    
    @Column({ name: 'AddressId' })
    public addressId: number;

    
    @Column({ name: 'BranchId' })
    public branchId: number;

    
    @Column({ name: 'Gender' })
    public gender: string;

    
    @Column({ name: 'Name' })
    public name: string;

    
    @Column({ name: 'Surname' })
    public surname: string;

    
    @Column({ name: 'CreatedOn' })
    public createdOn: Date;

    
    @Column({ name: 'PhoneNo' })
    public phoneNo: string;

    
    @Column({ name: 'Email' })
    public email: string;

    
    @Column({ name: 'Details' })
    public details: string;

    @Column({ name: "UserId" })
    public userId: number;
}