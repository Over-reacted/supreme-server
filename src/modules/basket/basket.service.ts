import { Injectable } from '@nestjs/common';
import { IBasket, IItem } from './basket.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsRepository } from 'modules/products/products.repository';

@Injectable()
export class BasketService {

    constructor(
        private productsRepository: ProductsRepository,
        @InjectModel("Basket") private readonly basketModel: Model<IBasket>,
        @InjectModel("Item") private readonly itemModel: Model<IItem>,
    ){}

    async getBasket(){
        let basket = await this.getCurrentBasket();
        return {totalSum:basket.totalSum, total: basket.total, numOfItems: basket.numOfItems, items:basket.items };
    }

    private async getCurrentBasket(): Promise<IBasket>{
        let basket = await this.basketModel.find();
        if(basket.length === 0){
            let createdBasket = new this.basketModel();
            return await createdBasket.save();
        }

        return basket[0];
    }
}
