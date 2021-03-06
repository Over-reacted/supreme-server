import { Injectable, NotFoundException } from "@nestjs/common";
import { IWishlist } from "./wishlist.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class WishlistRepository{
    constructor(@InjectModel("Wishlist") private readonly wishlistModel: Model<IWishlist>) {}

    async getWishlistByUserId(userId): Promise<IWishlist>{
        let wishlist = await this.wishlistModel.findOne( { userId: userId } );

        if(!wishlist){
            throw new NotFoundException(`Wishlist with userId: ${userId} not found`);
        }

        return wishlist;
    }
}