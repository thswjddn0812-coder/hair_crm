import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateVisitRecordDto {
  @IsInt()
  @IsNotEmpty({ message: '어떤 고객의 기록인지 member_id가 필요합니다.' })
  member_id: number;

  @IsString()
  @IsNotEmpty({ message: '시술 내용은 필수입니다.' })
  treatment: string; // 예: 커트, 펌, 전체염색 등

  @IsInt()
  @Min(0, { message: '가격은 0원 이상이어야 합니다.' })
  @IsOptional()
  price?: number; // 미용실 가격 정보 관리에 중요!

  @IsString()
  @IsOptional()
  memo?: string; // 예: "약간 짧게 원하심", "영양 추가함" 등

  @IsString()
  @IsOptional()
  visited_at?: string; // 방문한 날짜 (YYYY-MM-DD 등), 없으면 현재 시간 사용
}