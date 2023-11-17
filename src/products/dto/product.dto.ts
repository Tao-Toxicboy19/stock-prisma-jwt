import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsOptional()
    @IsString()
    productImage: string;

    // @IsNotEmpty()
    // @IsNumber()
    // price: number | null;

    // @IsNotEmpty()
    // @IsNumber()
    // amount: number | null;

    // @IsNotEmpty()
    // @IsNumber()
    // productTypeId: number;
}