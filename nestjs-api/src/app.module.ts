import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { SizingModule } from './sizing/sizing.module';
import { MaterialsModule } from './materials/materials.module';
import { CompositionsModule } from './compositions/compositions.module';
import { CatalogModule } from './catalog/catalog.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    SizingModule,
    MaterialsModule,
    CompositionsModule,
    CatalogModule,
    CustomersModule,
    OrdersModule,
    ReportsModule,
  ],
  providers: [
    // JWT guard is global: every route requires a valid Bearer token
    // unless decorated with @Public()
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
