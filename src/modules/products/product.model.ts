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
    price:{
        currency: { type: String, required: true, default: "BGN" },
        centAmount:{ type: Number, required: true, default: 0 },
        fractionDigits:{ type: Number, required: true, default: 2 },
    },
    
    image: { type: String, required: true },
  });

  export interface IProduct extends Document{
    readonly _id: Schema.Types.ObjectId;
    name: string;
    slug: string;
    material: string;
    color: string;
    description: string;
    price:{
        currency: string;
        centAmount: number;
        fractionDigits: number;
    };
    image: string;
  }