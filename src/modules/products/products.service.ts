import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from './product.model';
import { ProductDto } from './dto/product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel("Product") private readonly productModel: Model<IProduct>,
        private productsRepository: ProductsRepository,
      ) {}

      async createProduct(createProductDto: ProductDto): Promise<IProduct>{
        return await this.productsRepository.createProduct(createProductDto);
      }

      async getAllProducts(): Promise<IProduct[]>{
          return await this.productModel.find();
      }

      async getProductById(id: string): Promise<IProduct>{
          let product = await this.productsRepository.findProductById(id);

          return product;
      }

      async deleteProductById(id: string): Promise<IProduct>{
          try {
            let result = await this.productModel.findByIdAndDelete(id);

            if(!result){
                throw new NotFoundException(`Product with id: ${id} not found`);
            }

            return result;
          }
          catch (error) {
            throw new NotFoundException(`${id} is an invalid ID`);
          }
      }

      async updateProduct(id: string, updateProductDto: ProductDto): Promise<IProduct>{
          let product = await this.productsRepository.findProductById(id);
          const {name, slug, material, color, description, currency, centAmount, fractionDigits, image} = updateProductDto;

          product.name = name;
          product.slug = slug;
          product.material = material;
          product.color = color;
          product.description = description;
          product.price.currency = currency;
          product.price.centAmount = centAmount;
          product.price.fractionDigits = fractionDigits;
          product.image = image;

          return await product.save();
      }
}
