import { Module } from '@nestjs/common';
import { UserLogic } from './user.logic';
import { UserService } from '../database/services/user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserLogic],
  exports: [UserLogic],
})
export class UserModule {}
