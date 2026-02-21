import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: { id: number; email: string; role: Role; companyId: number }) {
    const payload = { sub: user.id, email: user.email, role: user.role, companyId: user.companyId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
