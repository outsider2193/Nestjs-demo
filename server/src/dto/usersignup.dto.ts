import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateSignupDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(4)
    password: string

    @IsNotEmpty()
    @IsNumber()
    age: number

}