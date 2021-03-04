import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel("Product") private readonly productModel: Model<IProduct>,
        private productsRepository: ProductsRepository,
      ) {}

      async createProduct(createProductDto: CreateProductDto): Promise<IProduct>{
        return await this.productsRepository.createProduct(createProductDto);
      }

      async getAllProducts(): Promise<IProduct[]>{
          return await this.productModel.find();
      }
}
