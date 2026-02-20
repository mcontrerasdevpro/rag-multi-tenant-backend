import { Controller, Post, Body, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  createCompany(
    @Body('name') name: string,
    @Body('plan') plan?: string,
  ): Promise<Company> {
    return this.companyService.create(name, plan);
  }

  @Get()
  getAllCompanies(): Promise<Company[]> {
    return this.companyService.findAll();
  }
}