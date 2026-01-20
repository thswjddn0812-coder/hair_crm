import { Module } from '@nestjs/common';
import { VisitRecordsService } from './visit_records.service';
import { VisitRecordsController } from './visit_records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitRecords } from './entities/visit_record.entity';
import { Members } from '../members/entities/member.entity';

@Module({
  imports:[TypeOrmModule.forFeature([VisitRecords, Members])],
  controllers: [VisitRecordsController],
  providers: [VisitRecordsService],
})
export class VisitRecordsModule {}
