import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createOne } from 'src/tools/createOne';
import { NewEntity } from 'src/types/entity.types';
import { Repository } from 'typeorm';
import { User } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(newUser: NewEntity<User>): Promise<User> {
    return await createOne(this.userRepository, newUser);
  }
}
