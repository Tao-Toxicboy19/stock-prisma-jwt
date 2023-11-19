import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto';
import { Products } from './type';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/pubilc.decorator';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }
    
    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file'))
    createProduct(@Body() dto: ProductDto, @UploadedFile() file: Express.Multer.File):Promise<Products> {
        return this.productsService.createProduct(dto, file)
    }

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    findAllProducts(): Promise<Products[]> {
        return this.productsService.findAllProducts()
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findOneProduct(@Param() id: number): Promise<Products> {
        return this.productsService.findOneProducts(+id)
    }

    @Put()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file'))
    updateProduct(@Param() id: number, @Body() dto: ProductDto, @UploadedFile() file: Express.Multer.File): Promise<Products> {
        return this.productsService.updateProduct(dto, file, +id)
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    deleteProduct(@Param() id: number): Promise<Products> {
        return this.productsService.deleteProduct(+id)
    }
}
