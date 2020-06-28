import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IId } from "src/generics/id.interface";

@Entity()
export class Contact implements IId
{
    @PrimaryColumn()
    @PrimaryGeneratedColumn({ name : 'Id' })
    public id: number;

    @Column({ name : 'FirstName' })
    public firstName: string;

    @Column({ name: 'LastName' })
    public lastName: string;

    @Column({ name: 'Email' })
    public email: string;

    @Column({ name: 'PhoneNumber' })
    public phoneNumber: string;

    @Column({ name: 'Message' })
    public message: string;
}