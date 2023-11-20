import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth.guard';
import { ProductsModule } from './products/products.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    ProductTypeModule,
    StockModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule { }
