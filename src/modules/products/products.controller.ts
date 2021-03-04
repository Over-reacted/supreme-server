import { Controller, Get, Post, ValidationPipe, UsePipes, Body } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService){

    }

    @Post()
    @UsePipes(ValidationPipe)
    async createProduct(@Body() createProductDto: CreateProductDto){
        return await this.productService.createProduct(createProductDto);
    }
}
