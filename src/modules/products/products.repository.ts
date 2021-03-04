import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IProduct } from "./product.model";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel("Product") private readonly productModel: Model<IProduct>) {}

  async createProduct(createProductDto: CreateProductDto): Promise<IProduct>{

    const {name, slug, material, color, description, currency, centamount, fractionDigits, image} = createProductDto;
    let createdProduct = new this.productModel({
        name,
        slug,
        material,
        color,
        description,
        currency,
        centamount,
        fractionDigits,
        image,
    });
    return await createdProduct.save();
  }

  async getProductById(productId: string): Promise<IProduct>{
    let product = await this.productModel.findById(productId);
    if(!product){
        throw new NotFoundException("Product with such ID not found");
    }
    return product;
  }
}