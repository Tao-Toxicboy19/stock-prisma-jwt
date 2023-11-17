import { IsNotEmpty, IsString } from "class-validator";

export class ProductTypeDto {
    @IsNotEmpty()
    @IsString()
    productTypeName: string;
}