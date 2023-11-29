import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductTypeDto } from './dto';
import { ProductType } from './type';

@Injectable()
export class ProductTypeService {
    constructor(private prisma: PrismaService) { }

    async createProductType(dto: ProductTypeDto): Promise<ProductType> {
        try {
            const newProductType: ProductType = await this.prisma.productTypes.create({
                data: {
                    productTypeName: dto.productTypeName
                }
            })
            return newProductType
        } catch (error) {
            throw new Error("There are no products")
        }
    }
}
