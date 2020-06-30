import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class Credentials
{
    
    @IsString()
    @IsNotEmpty()
    public userName: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
}


export class Payload
{
    userName: string;
    iat: any;
}