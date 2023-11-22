import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Products } from './type';
import { ProductDto } from './dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private prisma: PrismaService
    ) { }

    async createProduct(dto: ProductDto, file: Express.Multer.File): Promise<Products> {
        try {
            const newProduct: Products = await this.prisma.products.create({
                data: {
                    productImage: file.filename,
                    productName: dto.productName,
                    price: +dto.price,
                    amount: +dto.amount,
                    productTypeId: +dto.productTypeId
                }
            })

            const cacheResult: Products[] = await this.cacheManager.get('products');

            if (cacheResult) {
                const newResult: Products[] = cacheResult.concat(newProduct);
                await this.cacheManager.set('products', newResult, 60000);
            } else {
                const result: Products[] = await this.prisma.products.findMany();
                await this.cacheManager.set('products', result, 60000);
            }

            return newProduct

        } catch (error) {
            throw new Error(`Failed to update profile: ${error.message}`);
        }
    }

    async findAllProducts(): Promise<Products[] | unknown> {
        try {
            const result: unknown = await this.cacheManager.get('products');
            if (result) return result

            const products: Products[] = await this.prisma.products.findMany({
                include: { productType: true }
            })

            await this.cacheManager.set('products', products, 60000)
            return products

        } catch (error) {
            throw new Error('There are no products.')
        }
    }

    async findOneProducts(id: number): Promise<Products | unknown> {
        try {
            const result: unknown = await this.cacheManager.get('product');
            if (result) return result

            const product: Products = await this.prisma.products.findUnique({ where: { id: id } })
            await this.cacheManager.set('product', product, 60000)

            return product

        } catch (error) {
            throw new Error('There are no products.')
        }
    }

    async updateProduct(dto: ProductDto, file: Express.Multer.File, id: number): Promise<Products | unknown> {
        try {
            const updateProduct: Products = await this.prisma.products.update({
                where: { id: id },
                data: {
                    productImage: file.filename,
                    productName: dto.productName,
                    price: +dto.price,
                    amount: +dto.amount,
                    productTypeId: +dto.productTypeId
                }
            })

            const result: unknown = await this.cacheManager.get('products');
            if (result) {
                await this.cacheManager.del('products');
                const cacheResult: Products[] = await this.prisma.products.findMany()
                await this.cacheManager.set('products', cacheResult, 60000)
            }

            return updateProduct

        } catch (error) {
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
