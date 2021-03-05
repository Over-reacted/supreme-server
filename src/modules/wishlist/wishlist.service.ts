import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWishlist } from './wishlist.model';
import { WishlistRepository } from './wishlist.repository';
import { IProduct } from 'modules/products/product.model';
import { ProductsRepository } from 'modules/products/products.repository';

@Injectable()
export class WishlistService {
    constructor(
        @InjectModel("Wishlist") private readonly wishlistModel: Model<IWishlist>,
        private wishlistRepository: WishlistRepository,
        @InjectModel("Product") private readonly productModel: Model<IProduct>,
        private productsRepository: ProductsRepository,
      ) {}


    async getWishlist():Promise<IProduct[]>{
        let wishlist = await this.getCurrentWishlist();
        return wishlist.products;
    }

    async addToWishlist(productId: string): Promise<void>{
        let wishlist = await this.getCurrentWishlist();

        let product = await this.productsRepository.findProductById(productId);
        wishlist.products.push(product);
        wishlist.save();
    }

    async removeFromWishlist(productId: string): Promise<void>{
        let wishlist = await this.getCurrentWishlist();
        wishlist.products = wishlist.products.filter(product => product._id.toString() !== productId);
        await wishlist.save();
    }

    private async getCurrentWishlist(): Promise<IWishlist>{
        //Checks whether a wishlist already exists and if so grabs it
        let wishlist = await this.wishlistModel.find();
        
        //Temporary logic to make sure there is one wishlist available at any time.
        //Will be reworked once users are introduced into the project
        if(!wishlist){
            let createdWishlist = new this.wishlistModel();
            await createdWishlist.save();
            wishlist = await this.wishlistModel.find();
        }

        //Gets the first element since there is only one wishlist available at any time
        return wishlist[0];
    }
}
