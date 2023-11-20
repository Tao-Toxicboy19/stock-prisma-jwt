import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { StockService } from './stock.service';
import { Public } from 'src/common/decorators/pubilc.decorator';
import { Stock } from './type';

@Controller('stock')
export class StockController {
    constructor(private stockService: StockService) { }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    findAllStock(): Promise<Stock[] | unknown> {
        return this.stockService.findAllStock()
    }
}