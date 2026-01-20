import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Members } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Members)
    private readonly membersRepository: Repository<Members>
  ) {}
  async create(name: string, phone: string) {
    const existingMember = await this.membersRepository.findOne({ where: { phone } });
    if (existingMember) {
      throw new Error('이미 등록된 전화번호입니다.');
    }
    const member = this.membersRepository.create({ name, phone });
    return await this.membersRepository.save(member);
  }
  async findAll(name?: string, phone?: string) {
    const where: any = {};
  
    if (name) {
      where.name = Like(`%${name}%`); // "홍"이 포함된 모든 이름 검색
    }
    if (phone) {
      where.phone = Like(`%${phone}%`); // 번호 뒷자리만 쳐도 나오게!
    }
  
    return await this.membersRepository.find({
      where,
      order: { name: 'ASC' }, // 이름순으로 정렬하면 보기 편하시겠지?
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
