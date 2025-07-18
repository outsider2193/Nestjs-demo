import { Injectable, NotFoundException, Param, UnauthorizedException } from "@nestjs/common";
import { CreateSignupDto } from "./dto/usersignup.dto";
import { CreateUserLoginDto } from "./dto/userlogin.dto";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";


@Injectable({})
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    async signup(signupDto: CreateSignupDto) {
        const userExist = await this.userRepo.findOne({ where: { email: signupDto.email } });
        if (userExist) {
            throw new NotFoundException("User already exists!");
        }
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        const newUser = this.userRepo.create({
            name: signupDto.name,
            email: signupDto.email,
            password: hashedPassword,
            age: signupDto.age
        })

        const savedUser = await this.userRepo.save(newUser);

        return { data: savedUser }

    }

    async login(loginDto: CreateUserLoginDto) {
        const user = await this.userRepo.findOne({ where: { email: loginDto.email } });
        if (!user) {
            throw new UnauthorizedException("Invalid email ");
        }
        const isMatching = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatching) {
            throw new UnauthorizedException("Invalid password");
        }

        return { data: user }
    }

    async getAllUsers() {
        const allUsers = await this.userRepo.find();
        if (!allUsers || allUsers.length === 0) {
            throw new NotFoundException("No users found");
        }
        return allUsers;
    }

    async getUsersById(id: number) {
        const usersById = await this.userRepo.findOne({ where: { id } });
        if (!usersById) {
            throw new NotFoundException(`no user with this id ${id}  found`)
        }
        return usersById;
    }

    async deleteUsersById(id: number) {
        const deletedUserId = await this.userRepo.findOne({ where: { id } });
        if (!deletedUserId) {
            throw new NotFoundException(`no user found with the id: ${id}`)
        }
        await this.userRepo.remove(deletedUserId);
        return { id };
    }

    async updateUsersById(id: number, updateDto: Partial<CreateSignupDto>) {
        const existingUser = await this.userRepo.findOne({ where: { id } });
        if (!existingUser) {
            throw new NotFoundException(`No user with this id ${id} found`);
        }

        const updatedUser = Object.assign(existingUser, updateDto);


        await this.userRepo.save(updatedUser);
        return updatedUser;
    }


}