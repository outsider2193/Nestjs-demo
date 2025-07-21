import { PartialType } from "@nestjs/swagger";
import { CreateSignupDto } from "./usersignup.dto";

export class UpdateUserDto extends PartialType(CreateSignupDto) { }