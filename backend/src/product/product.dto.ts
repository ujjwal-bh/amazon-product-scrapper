import { IsNotEmpty, IsString } from "class-validator"

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    url: string

    @IsNotEmpty()
    @IsString()
    img: string

    @IsNotEmpty()
    @IsString()
    price: string

}
