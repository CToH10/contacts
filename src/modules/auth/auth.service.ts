import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findEmail(email);

    if (user && (await compare(password, user.password))) {
      const { id, email } = user;

      return { id, email };
    }

    return null;
  }

  async login(user: User) {
    const found = await this.validateUser(user.email, user.password);
    const payload = { email: found!.email, sub: found!.id };
    const token = { token: this.jwtService.sign(payload) };

    return token;
  }
}
