import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateSignupDto } from "../dto/usersignup.dto";
import { CreateUserLoginDto } from "../dto/userlogin.dto";
import { UpdateUserDto } from "src/dto/updateuser.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    // @HttpCode(201)
    async registerUser(@Body() signupDto: CreateSignupDto) {
        const result = await this.authService.signup(signupDto)
        return {
            message: "User registered!",
            data: result.data
        }
    }

    @Post("login")
    async loginUser(@Body() loginDto: CreateUserLoginDto) {
        const loginResult = await this.authService.login(loginDto)
        return {
            message: "User logged in !",
            data: loginResult.data
        }
    }

    @Get("allusers")
    async allUsers() {
        const result = await this.authService.getAllUsers();
        return { message: "all users:", result }
    }

    @Get("usersbyid/:id")
    async byId(@Param("id") id: number) {
        const result = await this.authService.getUsersById(id);
        return { message: "users by id:", result }
    }
    @Delete("delete/:id")
    async delete(@Param("id") id: number) {
        const result = await this.authService.deleteUsersById(id);
        return { message: "deleted user:", result }
    }
    @Put("update/:id")
    async update(@Param("id") id: number, @Body() updateDto: UpdateUserDto) {
        const result = await this.authService.updateUsersById(id, updateDto)
        return { message: "updated user:", result }
    }

}