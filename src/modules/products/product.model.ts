import { Schema, Document } from "mongoose";
import {SchemaTypes} from "mongoose-double";

/**
 * Mongoose Profile Schema
 */
export const Product = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Schema.Types.Decimal128, required: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
  });

  export interface IProduct extends Document{
    readonly _id: Schema.Types.ObjectId;
    name: string;
    slug: string;
    material: string;
    color: string;
    description: string;
    price: number;
    currency: string;
    image: string;
  }