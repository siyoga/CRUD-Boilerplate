import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig, DatabaseConfigMap } from 'src/types/database.types';
import { RefreshToken } from './repositories/refreshToken.repository';
import { User } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { RefreshTokenService } from './services/refreshToken.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<DatabaseConfigMap>) => ({
        type: 'postgres',
        host: configService.get(DatabaseConfig.DATABASE_HOST),
        port: configService.get(DatabaseConfig.DATABASE_PORT),
        username: configService.get(DatabaseConfig.DATABASE_USERNAME),
        password: configService.get(DatabaseConfig.DATABASE_PASSWORD),
        database: configService.get(DatabaseConfig.DATABASE_NAME),
        entities: [RefreshToken, User],
        logging: configService.get(DatabaseConfig.DATABASE_SYNC),
        synchronize: configService.get(DatabaseConfig.DATABASE_SYNC),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RefreshToken, User]),
  ],
  providers: [UserService, RefreshTokenService],
  exports: [UserService, RefreshTokenService],
})
export class DatabaseModule {}
