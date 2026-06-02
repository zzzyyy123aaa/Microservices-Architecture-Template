import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  roles: string[];
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token: string): Promise<JwtPayload> {
    try { return this.jwtService.verify<JwtPayload>(token); }
    catch { throw new UnauthorizedException('Invalid token'); }
  }

  async generateToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
