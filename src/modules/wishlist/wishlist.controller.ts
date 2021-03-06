import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'modules/products/product.model';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'modules/auth/get-user.decorator';

@Controller('wishlist')
@UseGuards(AuthGuard("jwt"))
export class WishlistController {
    constructor(
        private wishlistService: WishlistService,
        ){}

    
    @Get()
    async getWishlist(@GetUser() user){
        return await this.wishlistService.getWishlist(user);
    }
    
    @Post('/:id')
    async addToWishlist(@Param('id') productId: string, @GetUser() user): Promise<void>{
        return await this.wishlistService.addToWishlist(productId, user);
    }

    @Delete('/:id')
    async removeFromWishlist(@Param('id') productId: string, @GetUser() user): Promise<void>{
        return await this.wishlistService.removeFromWishlist(productId, user);
    }
}
