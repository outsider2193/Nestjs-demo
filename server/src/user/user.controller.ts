import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/dto/createuser.dto";
import { CreateUserService } from "./user.service";


@Controller("user")
export class CreateUserController {
    constructor(private createService: CreateUserService) { }

    @Post("create")
    async createUser(@Body() createDto: CreateUserDto) {
        const createdUser = await this.createService.newUser(createDto);
        return { message: "user created", data: createdUser.data }
    }
}