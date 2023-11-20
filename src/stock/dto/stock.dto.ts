import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class StockDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}