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

    async findAllStock(): Promise<any> {
        try {
            const cachedValue = await this.cacheManager.get('test-cache');
            if (cachedValue) {
                console.log('hello cached value');
                console.log('xxxx',cachedValue)
                return { message: "from cache", stocks: cachedValue };
            }

            // const stocks = await this.prisma.stocks.findMany();
            return 'hello from cache'
            // return { message: "from database",cachedValue };
        } catch (error) {
            throw new Error(error);
        }
    }

    async createStock(dto: StockDto): Promise<Stock> {
        try {
            const newStock = await this.prisma.stocks.create({
                data: {
                    name: dto.name,
                    price: +(dto.price),
                }
            });

            const cachedValue = await this.cacheManager.get('stock');
            let newData = []

            if (cachedValue) {
                console.log("cachedValue :", cachedValue)
            } else {
                const result = await this.prisma.stocks.findMany()
                console.log('hello')
                await this.cacheManager.set('test-cache', result);
            }
            // const data = await this.cacheManager.get('stock');
            // console.log(data)

            return newStock

        } catch (error) {
            throw new Error(error);
        }
    }
}
