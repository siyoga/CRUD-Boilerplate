import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppConfig, AppConfigMap } from 'src/types/app.types';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthLogic } from './logic/auth.logic';
import { TokenLogic } from './logic/tokenPair.logic';
import { RefreshTokenService } from '../database/services/refreshToken.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfigMap>) => ({
        secret: configService.get(AppConfig.JWT_SECRET),
      }),

      inject: [ConfigService],
    }),
  ],

  providers: [AuthLogic, TokenLogic],

  controllers: [AuthController],
  exports: [AuthLogic],
})
export class AuthModule {}
