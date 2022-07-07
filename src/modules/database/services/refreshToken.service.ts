import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RefreshToken } from '../repositories/refreshToken.repository';
import { createOne } from '../../../tools/createOne';
import { NewEntity } from 'src/types/entity.types';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async findOneByUsername(username: string): Promise<RefreshToken> {
    return await this.refreshTokenRepository.findOne({
      where: {
        user: {
          username: username,
        },
      },
    });
  }

  async findOneByRefreshToken(refreshToken: string): Promise<RefreshToken> {
    return await this.refreshTokenRepository.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async create(
    newRefreshToken: NewEntity<RefreshToken>,
  ): Promise<RefreshToken> {
    return await createOne(this.refreshTokenRepository, newRefreshToken);
  }

  async remove(refreshToken: RefreshToken): Promise<DeleteResult> {
    return await this.refreshTokenRepository.delete(refreshToken);
  }
}
