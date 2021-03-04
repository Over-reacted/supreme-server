import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist } from './wishlist.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Wishlist", schema: Wishlist }])],
  controllers: [WishlistController],
  providers: [WishlistRepository,WishlistService]
})
export class WishlistModule {}
