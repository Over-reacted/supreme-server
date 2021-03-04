import { IsString, IsNotEmpty, IsCurrency, IsNumber, IsUrl, IsNumberString } from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsNotEmpty()
    @IsString()
    material: string;

    @IsNotEmpty()
    @IsString()
    color: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    currency: string;

    @IsNotEmpty()
    @IsNumberString()
    centAmount: number;

    @IsNotEmpty()
    @IsNumberString()
    fractionDigits: number;

    @IsNotEmpty()
    @IsUrl()
    image: string;
}