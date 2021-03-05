import { Schema, Document } from "mongoose";
import { IProduct } from "modules/products/product.model";

export const Item = new Schema({
    product: { type: Schema.Types.Mixed, required: false },
    quantity: { type: Number, required: false, default: 0},
});

export const Basket = new Schema({
    totalSum:{
        currency: { type: String, required: false },
        centAmount:{ type: Number, required: false, default: 0 },
        fractionDigits:{ type: Number, required: false, default: 0 },
    },
    total: { type: Number, required: false, default: 0 },
    numOfItems: { type: Number, required: false, default: 0 },
    items: { type: [Item], required: false },
  });

export interface IItem extends Document{
    product: IProduct;
    quantity: number;
}

export interface IBasket extends Document{
    readonly _id: Schema.Types.ObjectId;
    totalSum: {
        currency: string;
        centAmount: number;
        fractionDigits: number;
    };
    total: number;
    numOfItems: number;
    items: [IItem];
}