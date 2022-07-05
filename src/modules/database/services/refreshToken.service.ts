import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/modules/database/repositories/refreshToken.repository';
import { createOne } from 'src/tools/createOne';
import { NewEntity } from 'src/types/entity.types';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async findOne(username: string): Promise<RefreshToken> {
    return await this.refreshTokenRepository.findOne({
      where: {
        user: {
          username: username,
        },
      },
    });
  }

  async create(
    newRefreshToken: NewEntity<RefreshToken>,
  ): Promise<RefreshToken> {
    return await createOne(this.refreshTokenRepository, newRefreshToken);
  }

  async remove(username: string): Promise<DeleteResult> {
    return await this.refreshTokenRepository.delete({
      user: {
        username: username,
      },
    });
  }
}
