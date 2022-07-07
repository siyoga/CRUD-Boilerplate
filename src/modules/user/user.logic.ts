import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../database/services/user.service';

import bcrypt from 'bcryptjs';
import { pbkdf2Sync } from 'pbkdf2';
import { createHash, randomBytes } from 'crypto';

interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

type UserEntity = Omit<IUser, 'password'> & {
  salt: string;
  hashedPassword: string;
};

type InBaseUserModel = UserEntity & { id: string };

@Injectable()
export class UserLogic {
  constructor(private readonly userService: UserService) {}

  async create(user: IUser): Promise<InBaseUserModel> {
    const existUsername = await this.userService.findOne(user.username);

    if (existUsername) {
      throw new BadRequestException('This username is already taken');
    }

    const existEmail = await this.userService.findOne(user.email);

    if (existEmail) {
      throw new BadRequestException('This email is already taken');
    }

    const newUser = await this.createEntity(user);
    return await this.userService.create(newUser);
  }

  hashPlainPassword(receivedPasswordPlain: string, salt: string): string {
    return pbkdf2Sync(receivedPasswordPlain, salt, 32, 32, 'sha512').toString(
      'hex',
    );
  }

  private async createEntity({
    password,
    ...info
  }: IUser): Promise<UserEntity> {
    let userEntity: UserEntity;

    const salt = randomBytes(12).toString('hex');
    const hash = this.hashPlainPassword(password, salt);

    userEntity = {
      ...info,
      salt: salt,
      hashedPassword: hash,
    };

    return userEntity;
  }
}
