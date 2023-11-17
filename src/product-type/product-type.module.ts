import { Module } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProductTypeService,PrismaService],
  controllers: [ProductTypeController]
})
export class ProductTypeModule {}
