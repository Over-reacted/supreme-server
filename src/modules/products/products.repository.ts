import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IProduct } from "./product.model";

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel("Product") private readonly profileModel: Model<IProduct>) {}

  
}