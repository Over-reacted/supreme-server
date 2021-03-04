import { Controller, Get, Post, ValidationPipe, UsePipes, Body, Delete, Param, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { IProduct } from './product.model';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService){

    }

    @Post()
    @UsePipes(ValidationPipe)
    async createProduct(@Body() createProductDto: CreateProductDto){
        return await this.productService.createProduct(createProductDto);
    }

    @Get()
    async getProducts(): Promise<IProduct[]>{
        return await this.productService.getAllProducts();
    }

    @Get('/:id')
    async getProductById(@Param('id') id: string):Promise<IProduct>{
        return await this.productService.getProductById(id);
    }

    @Delete('/:id')
    async deleteProductById(@Param('id') id: string): Promise<IProduct>{
        return await this.productService.deleteProductById(id);
    }
}
