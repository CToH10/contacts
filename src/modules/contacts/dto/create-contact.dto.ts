// import { Expose, Type } from 'class-transformer';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
