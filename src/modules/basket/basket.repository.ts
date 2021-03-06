import { Injectable, NotFoundException } from "@nestjs/common";
import { IBasket } from "./basket.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BasketRepository{
    constructor(@InjectModel("Basket") private readonly basketModel: Model<IBasket>) {}

    async getBasketByUserId(userId): Promise<IBasket>{
        let basket = await this.basketModel.findOne( { userId:userId } );

        if(!basket){
            throw new NotFoundException(`Basket with userId: ${userId} not found`);
        }

        return basket;
    }
}