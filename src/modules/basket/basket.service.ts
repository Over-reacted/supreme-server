import { Injectable, NotFoundException } from '@nestjs/common';
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

            await basket.save();
        }
    }

    async increaseItemQuantity(productId: string): Promise<void>{
        let basket = await this.getCurrentBasket();
        let item = basket.items.find(item => item.product._id.toString() === productId);

        if(item){
            item.quantity++;
            basket.totalSum.centAmount += item.product.price.centAmount;
            await basket.save();
        }
        else{
            throw new NotFoundException(`Product with id: ${productId} not found`);
        }
    }

    async decreaseItemQuantity(productId: string): Promise<void>{
        let basket = await this.getCurrentBasket();
        let item = basket.items.find(item => item.product._id.toString() === productId);

        if(item){
            if(item.quantity!==0){
                item.quantity--;
                basket.totalSum.centAmount -= item.product.price.centAmount;

                if(item.quantity === 0){
                    basket.items = basket.items.filter(i => i._id.toString()!==item._id.toString()); //removes the whole item if the item.quantity reaches 0
                    basket.numOfItems--;
                }
                await basket.save();
            }
        }
        else{
            throw new NotFoundException(`Product with id: ${productId} not found`);
        }
    }
}
