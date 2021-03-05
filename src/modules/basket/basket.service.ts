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
        return {totalSum:basket.totalSum, numOfItems: basket.numOfItems, items:basket.items };
    }

    private async getCurrentBasket(): Promise<IBasket>{
        let basket = await this.basketModel.find();
        if(basket.length === 0){
            let createdBasket = new this.basketModel();
            return await createdBasket.save();
        }

        return basket[0];
    }

    async addToBasket(productId: string){
        let basket = await this.getCurrentBasket();
        let product = await this.productsRepository.findProductById(productId);
        let productExists = basket.items.some(item => item.product._id.toString() === productId);

        if(!productExists){
            let newItem = new this.itemModel({
                product,
                quantity: 1,
            });
            
            basket.items.push(newItem);
            basket.totalSum.centAmount += product.price.centAmount;
            basket.numOfItems++;

            return await basket.save();
        }
    }
}
