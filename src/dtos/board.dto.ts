import { IsString } from 'class-validator';

export class createBoardKindDto {
  @IsString()
  boardKind: string;
}
