// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(email: string, password: string, username: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(email, hashed, username);
    return { id: user.id, email: user.email, username: user.username };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email invalide');
    }
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Mot de passe invalide');
    }
  
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
  
    return { access_token: token };
  }
}
