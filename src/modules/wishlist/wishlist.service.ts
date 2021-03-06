import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWishlist } from './wishlist.model';
import { WishlistRepository } from './wishlist.repository';
import { IProduct } from 'modules/products/product.model';
import { ProductsRepository } from 'modules/products/products.repository';
import { IProfile } from 'modules/profile/profile.model';

@Injectable()
export class WishlistService {
    constructor(
        private wishlistRepository: WishlistRepository,
        private productsRepository: ProductsRepository,
      ) {}

    async getWishlist(user: IProfile){
        return {products: user.wishlist.products, count: user.wishlist.count};
    }

    async addToWishlist(productId: string, user: IProfile): Promise<void>{
        let wishlist = user.wishlist;
        let product = await this.productsRepository.findProductById(productId);

        //Checks if product already exists in the current wishlist
        let productExists = wishlist.products.some(p => p._id.toString() === productId);

        if(!productExists){
            wishlist.products.push(product);
            wishlist.count++;
            await user.save();
        }
    }

    async removeFromWishlist(productId: string, user: IProfile): Promise<void>{
        let wishlist = user.wishlist;

        if(wishlist.count!==0){ //To ensure there is a product
            wishlist.products = wishlist.products.filter(product => product._id.toString() !== productId);
            wishlist.count--;
            await user.save();
        }
    }
}
