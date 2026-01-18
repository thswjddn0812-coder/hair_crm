import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { UsersModule } from './users/users.module';
import { VisitRecordsModule } from './visit_records/visit_records.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MembersModule, UsersModule, VisitRecordsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
