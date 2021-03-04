import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from './wishlist.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from 'modules/products/product.model';

@Module({
  imports: 
  [
    MongooseModule.forFeature([{ name: "Wishlist", schema: Wishlist }]),
    MongooseModule.forFeature([{ name: "Product", schema: Product }]),
  ],

  controllers: [WishlistController],
  providers: [WishlistRepository,WishlistService]
})
export class WishlistModule {}
