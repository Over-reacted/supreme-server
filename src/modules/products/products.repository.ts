import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IProduct } from "./product.model";
import { ProductDto } from "./dto/product.dto";
import { privateEncrypt } from "crypto";

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel("Product") private readonly productModel: Model<IProduct>) {}

  async createProduct(createProductDto: ProductDto): Promise<IProduct>{

    const {name, slug, material, color, description, currency, centAmount, fractionDigits, image} = createProductDto;
    let createdProduct = new this.productModel({
        name,
        slug,
        material,
        color,
        description,
        price:{currency, centAmount, fractionDigits},
        image,
    });

    return await createdProduct.save();
  }

  async findProductById(productId: string): Promise<IProduct>{
      let product = await this.productModel.findById(productId);

      if(!product){
          throw new NotFoundException(`Product with id: ${productId} not found`);
      }
      
      return product;
  }
}