import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });
    return this.usersRepository.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async find(email: string) {
    const user = await this.usersRepository.find({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.remove(user);
  }
}
