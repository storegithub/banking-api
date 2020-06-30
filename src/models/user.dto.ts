import { IsNumber, IsString, IsBoolean } from "class-validator";

export class UserDto
{
    public id?: number;

    @IsString()
    public userName: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;

    public active: boolean;

    public toJson(): string
    {
        return JSON.stringify(this);
    }

    public customerId?: number;
}

export class RegisterUserDto
{
    public id?: number;

    @IsString()
    public userName: string;

    @IsString()
    public email: string;

    @IsString()
    public password: string;
    @IsString()
    public confirmPassword: string;

    public active: boolean;

    public toJson(): string
    {
        return JSON.stringify(this);
    }
}


export class UserLiteDto 
{
    public id?: number;
    public userName: string;
    public email: string;
    public token: string;

    public firstName: string;
    public lastName: string;

    public success: boolean;
}