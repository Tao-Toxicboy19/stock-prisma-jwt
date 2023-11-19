import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeDto } from './dto';
import { ProductType } from './type';
import { Public } from 'src/common/decorators/pubilc.decorator';

@Controller('product-type')
export class ProductTypeController {
    constructor(private productTypeService: ProductTypeService) { }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createProductType(@Body() dto: ProductTypeDto): Promise<ProductType> {
        return this.productTypeService.createProductType(dto)
    }
}
