import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    // Aquí iría la lógica real de validación de usuario
    // Ejemplo temporal:
    const user = { id: 1, email: body.email, role: Role.ADMIN, companyId: 1 };
    return this.authService.generateToken(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('test-admin')
  testAdmin() {
    return { msg: 'Acceso permitido solo para ADMIN' };
  }
}
