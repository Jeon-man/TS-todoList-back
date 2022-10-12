import { IsNotEmpty, IsString } from 'class-validator';

export class createBoardKindDto {
  @IsString()
  boardKind: string;
}

export class createBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class updateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
