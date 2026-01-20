import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RefreshTokens } from './entities/RefreshTokens.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokens)
    private readonly refreshTokenRepository: Repository<RefreshTokens>,
    @InjectRepository(Users)
    private readonly usersRepository:Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly usersService:UsersService,
  ){}
    async validateUser(username:string,pass:string):Promise<any>{
      const user=await this.usersService.findOne(username);
      if(!user){
      throw new UnauthorizedException()
      }
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const {password, ...result}=user;
      return result;
    }
    async login(user:any){
      const payload={username:user.username,sub:user.id}
      const accessToken=this.jwtService.sign(payload);
      const refreshToken=this.jwtService.sign(payload,{expiresIn:'7d'});
      await this.saveRefreshToken(user.id,refreshToken);
      return{
        accessToken:accessToken,
        refreshToken:refreshToken,
      };
    }
    async saveRefreshToken(userId:number,token:string){
      const expiryDate=new Date();
      expiryDate.setDate(expiryDate.getDate()+7);
      await this.refreshTokenRepository.save({
        userId,
        token,
        expiresAt:expiryDate
      })
    }
    async register(name: string, pw: string, username: string) {
      const isUserExists = await this.usersRepository.findOne({ where: { username } });
      if (isUserExists) {
        throw new ConflictException('아이디가 중복됐습니다.');
      }
      const hashedPassword = await bcrypt.hash(pw, 10);
      const now = new Date();
      const formattedNow = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
      const userEntity = this.usersRepository.create({
        username,
        password: hashedPassword,
        name,
        createdAt: now, // 저장할 필드가 있다면 넣습니다. (엔티티의 컬럼명에 따라 조정)
      });
      await this.usersRepository.save(userEntity);
    }
  }