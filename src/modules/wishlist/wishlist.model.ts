import { Schema, Document } from "mongoose";
import { IProduct } from "modules/products/product.model";

export const Wishlist = new Schema({
    products: { type: [], required: false },
    count: { type: Number, required: true, default: 0 },
  });

  export interface IWishlist extends Document{
    readonly _id: Schema.Types.ObjectId;
    products: IProduct[];
    count: number;
  }