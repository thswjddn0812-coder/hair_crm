import { Injectable } from '@nestjs/common';
import { CreateVisitRecordDto } from './dto/create-visit_record.dto';
import { UpdateVisitRecordDto } from './dto/update-visit_record.dto';

@Injectable()
export class VisitRecordsService {
  create(createVisitRecordDto: CreateVisitRecordDto) {
    return 'This action adds a new visitRecord';
  }

  findAll() {
    return `This action returns all visitRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitRecord`;
  }

  update(id: number, updateVisitRecordDto: UpdateVisitRecordDto) {
    return `This action updates a #${id} visitRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitRecord`;
  }
}
