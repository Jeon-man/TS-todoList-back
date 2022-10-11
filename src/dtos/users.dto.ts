import { IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsNumber()
  public groupId: number;
}

export class EmailAuthDto {
  @IsNumber()
  public userId: number;

  @IsString()
  public authKey: string;
}
