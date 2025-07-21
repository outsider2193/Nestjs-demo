import { Body, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dto/createuser.dto";
import * as bcrypt from "bcrypt"


@Injectable({})
export class CreateUserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }
    async newUser(createDto: CreateUserDto) {
        const userExist = await this.userRepo.findOne({ where: { email: createDto.email } });
        if (userExist) {
            throw new NotFoundException("User already exists!");
        }
        const hashedPassword = await bcrypt.hash(createDto.password, 10);
        const newUser = this.userRepo.create({
            name: createDto.name,
            email: createDto.email,
            password: hashedPassword,
            age: createDto.age,
            role: createDto.role
        })

        const savedUser = await this.userRepo.save(newUser);

        return { data: savedUser }
    }
}