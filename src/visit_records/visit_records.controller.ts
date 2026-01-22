import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VisitRecordsService } from './visit_records.service';
import { CreateVisitRecordDto } from './dto/create-visit_record.dto';
import { UpdateVisitRecordDto } from './dto/update-visit_record.dto';

@Controller('visit-records')
export class VisitRecordsController {
  constructor(private readonly visitRecordsService: VisitRecordsService) {}

  @Post("members/:memberId/visit-records")
  async create(
    @Param("memberId") memberId:number,
    @Body() createVisitRecordDto:CreateVisitRecordDto
  ){
    return await this.visitRecordsService.create(memberId, createVisitRecordDto);
  }

  @Get("members/:memberId")
  async findByMemberId(@Param("memberId") memberId: number) {
    return await this.visitRecordsService.findByMemberId(memberId);
  }

  @Get("Date")
  async getDate(@Query('date')date:Date){
    return await this.visitRecordsService.getDate(date)
  }
  @Get()
  findAll() {
    return this.visitRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitRecordDto: UpdateVisitRecordDto) {
    return this.visitRecordsService.update(+id, updateVisitRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitRecordsService.remove(+id);
  }
}
