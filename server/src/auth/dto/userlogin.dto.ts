import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserLoginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}