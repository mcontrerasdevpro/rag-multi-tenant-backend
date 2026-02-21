import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

// const payload = { sub: user.id, email: user.email, role: user.role, companyId: user.companyId };

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {

  @Get('all')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  findAllUsers() {
    return []; // aquí tu lógica para devolver todos los usuarios
  }

  @Get('profile')
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  getProfile() {
    return {}; // aquí tu lógica para devolver el perfil del usuario actual
  }
}