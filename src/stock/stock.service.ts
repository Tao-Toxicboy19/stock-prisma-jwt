import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockDto } from './dto';
import { Stock } from './type';
import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class StockService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private prisma: PrismaService
    ) { }

    async findAllStock(): Promise<Stock[] | unknown> {
        try {
            const cachedValue = await this.cacheManager.get('stock')
            if (cachedValue) {
                console.log('hello cached value')
                return cachedValue
            }

            const stocks = await this.prisma.stocks.findMany()
            console.log('from api')

            await this.cacheManager.set('stock', stocks, 30000)
            console.log('set data to cached value')

            return stocks
        } catch (error) {
            throw new Error(error);
        }
    }
}
