import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findEmail(email);

    if (user && user.password === password) {
      const { id, email } = user;

      return { id, email };
    }

    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const token = { token: this.jwtService.sign(payload) };

    return token;
  }
}
