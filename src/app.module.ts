import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { ProductsModule } from './products/products.module';
import { ProductTypeModule } from './product-type/product-type.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductsModule, ProductTypeModule,],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})

export class AppModule { }
