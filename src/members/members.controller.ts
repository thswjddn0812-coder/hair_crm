import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
  @Post("add")
  async create(@Body() CreateMemberDto:CreateMemberDto){
    const user=await this.membersService.create(
      CreateMemberDto.name,
      CreateMemberDto.phone??''
    )
    return  `${CreateMemberDto.name}님이 등록되었습니다.`
  }
  @Get("All")
  async findAll(@Query('name') name?:string,@Query('phone') phone?:string){
    return await this.membersService.findAll(name,phone);
  }
  @Delete(":memberId")
  async remove(@Param('memberId') memberId:number){
    return await this.membersService.remove(memberId)
  }
}
