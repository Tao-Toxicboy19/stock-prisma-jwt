import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { StockService } from './stock.service';
import { Public } from 'src/common/decorators/pubilc.decorator';
import { Stock } from './type';
import { StockDto } from './dto';

@Controller('stock')
export class StockController {
    constructor(private stockService: StockService) { }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    findAllStock(): Promise<Stock[] | unknown> {
        return this.stockService.findAllStock()
    }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createStock(@Body() dto: StockDto): Promise<Stock> {
        return this.stockService.createStock(dto)
    }
}