import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateSignupDto } from "../dto/usersignup.dto";
import { CreateUserLoginDto } from "../dto/userlogin.dto";
import { UpdateUserDto } from "src/dto/updateuser.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./guard/auth.guard";
import { RolesGuard } from "./guard/role.guard";
import { Roles } from "src/common/decorator/roles.decorator";

@Controller("auth")
@UseGuards(AuthGuard, RolesGuard)
export class AuthController {
    constructor(private authService: AuthService, private jwtservice: JwtService) { }


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
            data: loginResult.data, token: loginResult.token
        }
    }


    @Get("allusers")
    @Roles("admin")
    async allUsers() {
        const result = await this.authService.getAllUsers();
        return { message: "all users:", result }
    }

    @Get("usersbyid/:id")
    @Roles("admin")
    async byId(@Param("id") id: number) {
        const result = await this.authService.getUsersById(id);
        return { message: "users by id:", result }
    }
    @Delete("delete/:id")
    @Roles("admin")
    async delete(@Param("id") id: number) {
        const result = await this.authService.deleteUsersById(id);
        return { message: "deleted user:", result }
    }
    @Put("update/:id")
    @Roles("admin")
    async update(@Param("id") id: number, @Body() updateDto: UpdateUserDto) {
        const result = await this.authService.updateUsersById(id, updateDto)
        return { message: "updated user:", result }
    }

}