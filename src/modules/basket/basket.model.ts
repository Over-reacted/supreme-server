import { Schema, Document } from "mongoose";
import { IProduct } from "modules/products/product.model";

export const Item = new Schema({
    product: { type: Schema.Types.Mixed, required: false },
    quantity: { type: Number, required: false},
});

export const Basket = new Schema({
    total: { type: Number, required: false },
    numOfItems: { type: Number, required: false },
    items: { type: [Item], required: false },
  });

export interface IItem extends Document{
    product: IProduct;
    quantity: number;
}

export interface IBasket extends Document{
    readonly _id: Schema.Types.ObjectId;
    total: number;
    numOfItems: number;
    items: [IItem];
}