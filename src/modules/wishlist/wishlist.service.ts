import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWishlist } from './wishlist.model';
import { WishlistRepository } from './wishlist.repository';
import { IProduct } from 'modules/products/product.model';

@Injectable()
export class WishlistService {
    constructor(
        @InjectModel("Wishlist") private readonly wishlistModel: Model<IWishlist>,
        private wishlistRepository: WishlistRepository,
        @InjectModel("Product") private readonly productModel: Model<IProduct>,
      ) {}

    async addToWishlist(productId: string): Promise<void>{
        let wishlist = await this.getCurrentWishlist();

        let product = await this.productModel.findById(productId);
        if(!product){
            throw new NotFoundException("Product with such ID not found");
        }
        wishlist.products.push(product);
        wishlist.save();
    }

    async getCurrentWishlist(): Promise<IWishlist>{
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
