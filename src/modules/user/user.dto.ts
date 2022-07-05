import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class NewUserDTO {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  username: string;

  @IsEmail()
  @MinLength(2)
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  password: string;
}
