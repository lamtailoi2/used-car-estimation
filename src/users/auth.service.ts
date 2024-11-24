import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserEntity } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signUp(email: string, password: string): Promise<UserEntity> {
    // Check email
    const user = await this.usersService.find(email);
    if (user.length) {
      throw new BadRequestException('Email already in use');
    }
    // Hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex'); // salt.hash
    // Create a new user and save it
    const newUser = await this.usersService.create(email, result);
    // Return the user
    return newUser;
  }

  async signIn(email: string, password: string): Promise<UserEntity> {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const [salt, hashedPass] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hashedPass !== hash.toString('hex')) {
      throw new BadRequestException('Password is incorrect');
    }
    return user;
  }

  
}
