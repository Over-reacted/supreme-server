import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWishlist } from './wishlist.model';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
    constructor(
        @InjectModel("Wishlist") private readonly wishlistModel: Model<IWishlist>,
        private wishlistRepository: WishlistRepository,
      ) {}

    
}
