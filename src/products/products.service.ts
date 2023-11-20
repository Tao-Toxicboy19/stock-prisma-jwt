import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Products } from './type';
import { ProductDto } from './dto';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async createProduct(dto: ProductDto, file: Express.Multer.File): Promise<Products> {
        try {
            const newProduct = await this.prisma.products.create({
                data: {
                    productImage: file.filename,
                    productName: dto.productName,
                    price: +(dto.price),
                    amount: +(dto.amount),
                    productTypeId: +(dto.productTypeId)
                }
            })
            return newProduct
        } catch (error) {
            throw new Error(`Failed to update profile: ${error.message}`);
        }
    }

    async findAllProducts(): Promise<Products[]> {
        try {
            return await this.prisma.products.findMany({
                include: {
                    productType: true
                }
            })
        } catch (error) {
            throw new Error('There are no products.')
        }
    }

    async findOneProducts(id: number): Promise<Products> {
        try {
            return await this.prisma.products.findUnique({ where: { id: id } })
        } catch (error) {
            throw new Error('There are no products.')
        }
    }

    async updateProduct(dto: ProductDto, file: Express.Multer.File, id: number): Promise<Products> {
        try {
            const updateProduct = await this.prisma.products.update({
                where: { id: id },
                data: {
                    productImage: file.filename,
                    productName: dto.productName,
                    price: +(dto.price),
                    amount: +(dto.amount),
                    productTypeId: +(dto.productTypeId)
                }
            })
            return updateProduct
        } catch (error) {
            console.log(error)
            throw new Error('There are no products.')
        }
    }

    async deleteProduct(id: number): Promise<Products> {
        try {
            return await this.prisma.products.delete({ where: { id: id } })
        } catch (error) {
            throw new Error('There are no products.')
        }
    }
}
