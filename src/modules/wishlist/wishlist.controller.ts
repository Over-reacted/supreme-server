import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'modules/products/product.model';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'modules/auth/get-user-id.decorator';
import { IProfile } from 'modules/profile/profile.model';

@Controller('wishlist')
@UseGuards(AuthGuard("jwt"))
export class WishlistController {
    constructor(private wishlistService: WishlistService){}

    @Get()
    async getWishlist(@GetUserId() userId: string){
        return await this.wishlistService.getWishlist(userId);
    }
    
    @Post('/:id')
    async addToWishlist(@Param('id') productId: string, @GetUserId() userId: string): Promise<void>{
        return await this.wishlistService.addToWishlist(productId, userId);
    }

    @Delete('/:id')
    async removeFromWishlist(@Param('id') productId: string, @GetUserId() userId: string): Promise<void>{
        return await this.wishlistService.removeFromWishlist(productId, userId);
    }
}
