import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsOptional()
    @IsString()
    productImage: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsNotEmpty()
    @IsString()
    productTypeId: string;
}