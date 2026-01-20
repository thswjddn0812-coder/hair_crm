import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class registerDTo{
    @IsNotEmpty({message:"아이디는 필수 값 입니다."})
    @IsString()
    @MaxLength(12,{message:"최대 길이는 12자 입니다"})
    username:string;
    @IsNotEmpty({message:"비밀번호도 필수 값 입니다."})
    @IsString()
    @MinLength(4,{message:"최소 4글자 이상 입니다."})
    @MaxLength(12,{message:"최대 12글자 이하 입니다."})
    password:string;
    @IsNotEmpty({message:"이름은 필수 값 입니다."})
    @IsString()
    name:string;
}