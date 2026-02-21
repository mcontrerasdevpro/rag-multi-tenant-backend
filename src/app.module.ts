import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // carga .env automáticamente
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // solo en desarrollo
    }),
    CompanyModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}