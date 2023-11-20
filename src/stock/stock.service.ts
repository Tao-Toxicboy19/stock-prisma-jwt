import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockDto } from './dto';
import { Stock } from './type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class StockService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private prisma: PrismaService
    ) { }

    async findAllStock(): Promise<Stock[] | unknown> {
        try {
            const cachedValue: unknown = await this.cacheManager.get('stock');
            if (cachedValue) return { message: "from cache", cachedValue };

            const stocks: Stock[] = await this.prisma.stocks.findMany();
            return { message: "from database", stocks };

        } catch (error) {
            throw new Error(error);
        }
    }

    async createStock(dto: StockDto): Promise<Stock> {
        try {
            const newStock: Stock = await this.prisma.stocks.create({
                data: {
                    name: dto.name,
                    price: +dto.price,
                }
            });

            const result: Stock[] = await this.cacheManager.get('stock');

            if (result) {
                const newResult: Stock[] = result.concat(newStock);
                await this.cacheManager.set('stock', newResult);
            } else {
                const result: Stock[] = await this.prisma.stocks.findMany();
                await this.cacheManager.set('stock', result, 60000);
            }

            return newStock

        } catch (error) {
            throw new Error(error);
        }
    }
}
