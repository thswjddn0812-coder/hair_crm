import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokens } from './entities/RefreshTokens.entity';
import { Users } from 'src/users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports:[PassportModule.register({defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([RefreshTokens,Users]),
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
  }),UsersModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService,JwtModule]
})
export class AuthModule {}
