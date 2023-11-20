import { IsNotEmpty, IsString } from "class-validator";

export class StockDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    price: string;
}