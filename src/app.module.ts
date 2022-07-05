import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),

    AuthModule,
    UserModule,
    DatabaseModule,
  ],
})
export class AppModule {}
