import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';

import { AppConfig, AppConfigMap } from '../../../types/app.types';
import { RefreshTokenService } from '../../database/services/refreshToken.service';
import { RefreshToken } from '../../database/repositories/refreshToken.repository';
import { User } from '../../database/repositories/user.repository';

interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenLogic {
  private jwtSecret: string;

  constructor(
    private readonly JwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly configService: ConfigService<AppConfigMap>,
  ) {
    this.jwtSecret = this.configService.get(AppConfig.JWT_SECRET);
  }

  async generateTokenPair(user: User): Promise<ITokenPair> {
    const refreshToken = new RefreshToken();
    refreshToken.refreshToken = v4();
    refreshToken.user = user;

    const existRefreshToken = await this.refreshTokenService.findOneByUsername(
      user.username,
    );

    if (existRefreshToken) {
      throw new ConflictException('Refresh token already exist');
    }

    await this.refreshTokenService.create(refreshToken);

    return {
      accessToken: this.JwtService.sign(
        { userId: user.id },
        { expiresIn: '10d' },
      ),
      refreshToken: refreshToken.refreshToken,
    };
  }

  async refreshTokenPair(refreshToken: string): Promise<ITokenPair> {
    const existRefreshToken =
      await this.refreshTokenService.findOneByRefreshToken(refreshToken);

    if (!existRefreshToken) {
      throw new UnauthorizedException('Received refreshToken is not exist');
    }

    await this.refreshTokenService.remove(existRefreshToken);

    return await this.generateTokenPair(existRefreshToken.user);
  }

  decodeAuthHeader(authHeader: string | undefined): string {
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header don't found");
    }

    const [headerType, accessToken] = authHeader.split(' ');

    if (headerType !== 'Bearer') {
      throw new UnauthorizedException('Incorrect auth type.');
    }

    if (!accessToken) {
      throw new UnauthorizedException('Invalid access token');
    }

    try {
      this.JwtService.verify(accessToken, {
        secret: this.jwtSecret,
        ignoreExpiration: false,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid access token');
    }

    return this.JwtService.decode(accessToken) as string;
  }
}
