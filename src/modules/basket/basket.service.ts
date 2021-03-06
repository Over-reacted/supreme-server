import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IBasket, IItem } from './basket.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsRepository } from 'modules/products/products.repository';
import { IProfile } from 'modules/profile/profile.model';
import { BasketRepository } from './basket.repository';

@Injectable()
export class BasketService {

    constructor(
        private productsRepository: ProductsRepository,
        private basketRepository: BasketRepository,
        @InjectModel("Basket") private readonly basketModel: Model<IBasket>,
        @InjectModel("Item") private readonly itemModel: Model<IItem>,
    ){}

    async getBasket(userId: string){
        let basket = await this.basketRepository.getBasketByUserId(userId);
        return {totalSum:basket.totalSum, numOfItems: basket.numOfItems, items:basket.items };
    }

    async addToBasket(productId: string, userId: string){
        let basket = await this.basketRepository.getBasketByUserId(userId); 
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

    async removeFromBasket(productId: string, userId: string): Promise<void>{
        let basket = await this.basketRepository.getBasketByUserId(userId);
        let item = basket.items.find(item => item.product._id.toString() === productId);

        if(item){
            basket.items = basket.items.filter(i => i.product._id.toString()!==productId);
            basket.totalSum.centAmount -= item.product.price.centAmount*item.quantity;
            basket.numOfItems--;
            await basket.save();
        }
        else{
            throw new NotFoundException(`Product with id: ${productId} not found in basket`);
        }
    }

    async increaseItemQuantity(productId: string, userId: string): Promise<void>{
        let basket = await this.basketRepository.getBasketByUserId(userId);
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

    async decreaseItemQuantity(productId: string, userId: string): Promise<void>{
        let basket = await this.basketRepository.getBasketByUserId(userId);
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

    async setItemQuantity(quantity: number, productId: string, userId: string){
        if(quantity === 0){
            await this.removeFromBasket(productId, userId);
        }
        else{
            let basket = await this.basketRepository.getBasketByUserId(userId);
            let item = basket.items.find(item => item.product._id.toString() === productId);

            if(item){
                basket.totalSum.centAmount -= item.product.price.centAmount*item.quantity; //deducts the price of the product.Price*oldQuantity
                item.quantity = quantity;
                basket.totalSum.centAmount += item.product.price.centAmount*item.quantity; //adds the price of the product.Price*newQuantity
                await basket.save();
            }
            else{
                throw new NotFoundException(`Product with id: ${productId} not found in basket`);
            }
        }
    }
}
