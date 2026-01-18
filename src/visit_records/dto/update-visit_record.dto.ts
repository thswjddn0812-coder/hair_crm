import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitRecordDto } from './create-visit_record.dto';

export class UpdateVisitRecordDto extends PartialType(CreateVisitRecordDto) {}
