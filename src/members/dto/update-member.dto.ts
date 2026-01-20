import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  // 수정할 때 방문 횟수를 수동으로 조정하고 싶을 경우를 대비해 추가
  @IsNumber()
  @IsOptional()
  total_visits?: number;
}