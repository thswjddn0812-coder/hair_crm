import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty({ message: '고객 이름은 필수입니다.' })
  @Length(1, 50)
  name: string;

  @IsString()
  @IsOptional() // 번호는 없을 수도 있으니까 선택사항으로!
  @Length(1, 50)
  phone?: string;
}