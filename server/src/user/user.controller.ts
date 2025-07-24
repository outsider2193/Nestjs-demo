import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/dto/createuser.dto";
import { CreateUserService } from "./user.service";
import { AuthGuard } from "../auth/guard/auth.guard"
import { RolesGuard } from "src/auth/guard/role.guard";
import { Roles } from "src/common/decorator/roles.decorator";


@Controller("admin")
@UseGuards(AuthGuard, RolesGuard)
export class CreateUserController {
    constructor(private createService: CreateUserService) { }


    @Post("create")
    @Roles("admin")
    async createUser(@Body() createDto: CreateUserDto) {
        const createdUser = await this.createService.newUser(createDto);
        return { message: "user created", data: createdUser.data }
    }
}