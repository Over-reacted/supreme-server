import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
    constructor(private wishlistService: WishlistService){

    }

    
}
