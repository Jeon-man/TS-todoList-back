import { IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  public toDo: string;

  //무조건 검사. 검사 안 하면 do ~ should not exist
  @IsNumber()
  public userId: number;
}
