import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CompanyService } from '../company/company.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  @Post('create-admin')
  async createAdmin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('companyName') companyName: string,
  ) {
    const company = await this.companyService.create(companyName);
    return this.userService.createAdmin(email, password, company);
  }
}