import { Injectable } from '@nestjs/common';
import { CreateVisitRecordDto } from './dto/create-visit_record.dto';
import { UpdateVisitRecordDto } from './dto/update-visit_record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitRecords } from './entities/visit_record.entity';
import { Members } from '../members/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisitRecordsService {
  constructor(
    @InjectRepository(VisitRecords)
    private readonly visitRecordsRepository: Repository<VisitRecords>,
    @InjectRepository(Members)
    private readonly membersRepository: Repository<Members>
  ) {}

  async create(memberId: number, createVisitRecordDto: CreateVisitRecordDto) {
    // visited_at이 제공되고 유효하면 사용하고, 없거나 유효하지 않으면 현재 시간 사용
    let visitedAt: Date;
    if (createVisitRecordDto.visited_at) {
      const parsedDate = new Date(createVisitRecordDto.visited_at);
      visitedAt = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    } else {
      visitedAt = new Date(); // 기본값: 현재 시간
    }

    const visitRecord = this.visitRecordsRepository.create({
      memberId,
      treatment: createVisitRecordDto.treatment,
      price: createVisitRecordDto.price,
      memo: createVisitRecordDto.memo,
      visitedAt: visitedAt, 
    });
    
    const savedVisitRecord = await this.visitRecordsRepository.save(visitRecord);
    const member = await this.membersRepository.findOne({ where: { id: memberId } });
    if (member) {
      member.totalVisits = (member.totalVisits || 0) + 1;
      await this.membersRepository.save(member);
    }

    return savedVisitRecord;
  }

  async findByMemberId(memberId: number) {
    return await this.visitRecordsRepository.find({
      where: { memberId },
      order: { visitedAt: 'DESC' }, // 최신 순으로 정렬
    });
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
