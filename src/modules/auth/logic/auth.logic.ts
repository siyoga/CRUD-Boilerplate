import { BadRequestException, Injectable } from '@nestjs/common';
import { pbkdf2Sync } from 'pbkdf2';

import { NewUserDTO } from '../../user/user.dto';
import { UserLogic } from '../../user/user.logic';
import { UserService } from '../../database/services/user.service';
import { TokenLogic } from './tokenPair.logic';
import { TokenPairDTO } from '../misc/tokenPair.dto';

// TODO: протестить

@Injectable()
export class AuthLogic {
  constructor(
    private readonly userService: UserService,
    private readonly tokenLogic: TokenLogic,
    private readonly userLogic: UserLogic,
  ) {}

  async register({
    firstName,
    lastName,
    username,
    email,
    password,
  }: NewUserDTO): Promise<void> {
    await this.userLogic.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });
  }

  async login(username: string, password: string): Promise<TokenPairDTO> {
    const existUser = await this.userService.findOne(username);

    if (!existUser) {
      throw new BadRequestException('Incorrect creds');
    }

    if (
      this.userLogic.hashPlainPassword(password, existUser.salt) !==
      existUser.hashedPassword
    ) {
      throw new BadRequestException('Incorrect creds');
    }

    return this.tokenLogic.generateTokenPair(existUser);
  }
}
