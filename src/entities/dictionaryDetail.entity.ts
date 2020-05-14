import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { IId } from "src/generics/id.interface";
 
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
}