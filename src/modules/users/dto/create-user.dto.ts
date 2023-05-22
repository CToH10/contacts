import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { group } from 'console';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password: string;
}
