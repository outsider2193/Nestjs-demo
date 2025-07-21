import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { CreateUserController } from "./user.controller";
import { CreateUserService } from "./user.service";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [CreateUserController],
    providers: [CreateUserService]
})
export class userCreate { }