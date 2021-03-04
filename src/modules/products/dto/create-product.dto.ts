import { IsString, IsNotEmpty, IsCurrency } from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    slug: string;

    @IsString()
    material: string;

    @IsString()
    color: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsCurrency()
    price: number;

    @IsNotEmpty()
    @IsString()
    currency: string;

    @IsString()
    image: string;
}