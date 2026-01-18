import { Module } from '@nestjs/common';
import { VisitRecordsService } from './visit_records.service';
import { VisitRecordsController } from './visit_records.controller';

@Module({
  controllers: [VisitRecordsController],
  providers: [VisitRecordsService],
})
export class VisitRecordsModule {}
