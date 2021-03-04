import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'modules/products/product.model';

@Controller('wishlist')
export class WishlistController {
    constructor(
        private wishlistService: WishlistService,
        @InjectModel("Product") private readonly productModel: Model<IProduct>,
        ){}

    
    @Get()
    async getWishlist(): Promise<IProduct[]>{
        return await this.wishlistService.getWishlist();
    }
    
    @Post('/:id')
    async addToWishlist(@Param('id') productId: string): Promise<void>{
        return await this.wishlistService.addToWishlist(productId);
    }

    @Delete('/:id')
    async removeFromWishlist(@Param('id') productId: string): Promise<void>{
        return await this.wishlistService.removeFromWishlist(productId);
    }
}
