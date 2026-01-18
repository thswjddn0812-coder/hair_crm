import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitRecordsService } from './visit_records.service';
import { CreateVisitRecordDto } from './dto/create-visit_record.dto';
import { UpdateVisitRecordDto } from './dto/update-visit_record.dto';

@Controller('visit-records')
export class VisitRecordsController {
  constructor(private readonly visitRecordsService: VisitRecordsService) {}

  @Post()
  create(@Body() createVisitRecordDto: CreateVisitRecordDto) {
    return this.visitRecordsService.create(createVisitRecordDto);
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
