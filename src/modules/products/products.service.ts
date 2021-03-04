import { Injectable, NotFoundException } from '@nestjs/common';
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

      async deleteProductById(id: string): Promise<IProduct>{
          try {
            let result = await this.productModel.findByIdAndDelete(id);
            
            if(!result){
                throw new NotFoundException();
            }

            return result;
          }
          catch (error) {
              throw new NotFoundException("Invalid id");
          }
      }
}
