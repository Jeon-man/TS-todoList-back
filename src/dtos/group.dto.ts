import { IsString } from 'class-validator';

export class createGroupDto {
  @IsString()
  groupName: string;
}
